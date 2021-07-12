import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fetchedPayments: [],
    totalPayments: null,
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
    setExistingPayments(state, payload) {
      payload.forEach(item => {
        if (!state.fetchedPayments.some(payment => payment.id === item.id)) {
          state.fetchedPayments.push(item)
        }
      })
    },

    addNewPayment(state, payload) {
      state.fetchedPayments.push(payload);
    },

    setTotalPayments(state, payload) {
      state.totalPayments = payload;
    },

    increaseTotalPayments(state) {
      state.totalPayments += 1;
    },

    decreaseTotalPayments(state) {
      state.totalPayments -= 1;
    },

    sortFetchedPayments(state) {
      state.fetchedPayments.sort((a, b) => {
        return a.id - b.id
      })
    },

    removePayment(state, id) {
      state.fetchedPayments = state.fetchedPayments.filter(payment => payment.id !== id)
    },

    updatePayment(state, payload) {
      const indexToUpdate = state.fetchedPayments.findIndex(payment => payment.id === payload.id);

      Vue.set(state.fetchedPayments, indexToUpdate, payload);
    },
  },
  getters: {
    getFetchedPayments(state) {
      return state.fetchedPayments
    },

    getFetchedPaymentsLength(state) {
      return state.fetchedPayments.length
    },

    getTotalPayments(state) {
      return state.totalPayments;
    },

    getCategoriesList(state) {
      return state.categories
    }
  },
  actions: {
    async fetchData({ commit, state }, page) {
      const response = await axios.get(
        'https://raw.githubusercontent.com/Dysco76/GeekBrains-VueJS/lesson5/budget_tracker/src/data.json'
      );

      const payments = response.data;
      const paymentsLength = Object.values(payments).flat().length;

      if (state.totalPayments < paymentsLength) commit('setTotalPayments', paymentsLength + state.totalPayments);

      let payload = [];

      for (let i = 1; i <= page; i++) {
        if (payments[`page${i}`]) {
          payload = [...payload, ...payments[`page${i}`]]
        }

      }
      await commit('setExistingPayments', payload);

      commit('sortFetchedPayments')
    }
  },
})