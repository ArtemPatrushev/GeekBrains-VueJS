<template>
  <div id="app">
    <button @click="showPaymentForm = !showPaymentForm">ADD NEW COST+</button>
    <AddPaymentForm @addNewPayment="addNewPayment" v-show="showPaymentForm" />
    <PaymentsList :payments="currentPagePayments" />
    <Pagination
      :paymentsLength="paymentsList.length"
      @pageChange="changePage"
    />
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

import PaymentsList from "./components/PaymentsList.vue";
import AddPaymentForm from "./components/AddPaymentForm.vue";
import Pagination from "./components/Pagination.vue";

export default {
  name: "App",
  components: {
    PaymentsList,
    AddPaymentForm,
    Pagination,
  },

  data() {
    return {
      showPaymentForm: false,
      paymentsPerPage: 3,
      currentPage: 1,
    };
  },

  computed: {
    ...mapGetters({ paymentsList: "getPaymentsList" }),

    currentPagePayments() {
      const { currentPage, paymentsList, paymentsPerPage } = this;
      const startIndex = (currentPage - 1) * paymentsPerPage;
      const paymentsToDisplay = paymentsList.slice(
        startIndex,
        startIndex + paymentsPerPage
      );
      return paymentsToDisplay;
    },
  },

  methods: {
    ...mapMutations(["addPayment"]),
    ...mapActions(["fetchData"]),

    addNewPayment(newPayment) {
      this.addPayment(newPayment);
    },

    changePage(number) {
      this.currentPage = number;
    },
  },

  mounted() {
    this.fetchData(this.currentPage);
  },
};
</script>

<style lang="scss">
</style>
