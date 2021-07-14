import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    paymentsList: [],
    categories: [
      'Food',
      'House',
      'Entertainment',
      "Navigation",
      "Sport",
      "Education",
      "Transport"
    ]
  },
  mutations: {
    setPayments(state, payload) {
      payload.forEach(item => {
        if (!state.paymentsList.some(payment => payment.id === item.id)) {
          state.paymentsList.push(item)
        }
      })
    },

    addPaymentToList(state, payment) {
      state.paymentsList.unshift(payment);
    },

    sortPaymentsByDate(state) {
      state.paymentsList.sort((a, b) => {
        return new Date(b.date) - new Date(a.date)
      })
    },

    assignNumbersToPayments(state) {
      state.paymentsList.forEach((payment, index) => {
        Vue.set(payment, 'number', index + 1)
      });
    },

    removePayment(state, id) {
      state.paymentsList = state.paymentsList.filter(payment => payment.id !== id)
    },

    updatePayment(state, payload) {
      const indexToUpdate = state.paymentsList.findIndex(payment => payment.id === payload.id);

      Vue.set(state.paymentsList, indexToUpdate, payload);
    },
  },
  getters: {
    getPayments(state) {
      return state.paymentsList
    },

    getPaymentsLength(state) {
      return state.paymentsList.length
    },

    getCategoriesList(state) {
      return state.categories
    }
  },
  actions: {
    async fetchData({ commit }) {
      const response = await axios.get(
        'https://raw.githubusercontent.com/Dysco76/GeekBrains-VueJS/lesson6/budget_tracker/src/data.json'
      );

      const payments = response.data;


      await commit('setPayments', payments);

      commit('sortPaymentsByDate');
      commit('assignNumbersToPayments');
    },

    addNewPayment({ commit, state }, payment) {
      commit('addPaymentToList', payment);

      if (new Date(payment.date) < new Date(state.paymentsList[1].date)) {
        commit('sortPaymentsByDate');
      }

      commit('assignNumbersToPayments');
    },

    deletePayment({ commit, state }, payment) {
      if (payment.id !== state.paymentsList[state.paymentsList.length - 1].id) {
        commit('removePayment', payment.id)
        commit('assignNumbersToPayments')
      } else {
        commit('removePayment', payment.id)
      }
    },

    editPayment({ commit, state }, payment) {

      const currentPayment = state.paymentsList.find(item => item.id === payment.id);
      const newPayment = payment;

      if (new Date(currentPayment) >= new Date(newPayment.date)) {
        commit('updatePayment', newPayment);
      } else {
        commit('updatePayment', newPayment);
        commit('sortPaymentsByDate');
        commit('assignNumbersToPayments');
      }
    }
  },
})