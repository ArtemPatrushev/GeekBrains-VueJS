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
    ]
  },
  mutations: {
    addPayment(state, payload) {
      state.paymentsList.push(payload);
    },
    // setPaymentsListData(state, payload) {

    // }
  },
  getters: {
    getPaymentsList(state) {
      return state.paymentsList
    },
    getLastPayment(state) {
      return state.paymentsList[state.paymentsList.length - 1]
    },
    getCategoriesList(state) {
      return state.categories
    }
  },
  actions: {
    async fetchData({ commit }, page) {
      const response = await axios.get(
        'https://raw.githubusercontent.com/Dysco76/GeekBrains-VueJS/lesson4/budget_tracker/src/data.json'
      );

      const payload = response.data[`page${page}`];

      payload.forEach(item => {
        if (!this.state.paymentsList.some(payment => payment.id === item.id)) {
          commit('addPayment', item)
        }
      })
    }
  },
})