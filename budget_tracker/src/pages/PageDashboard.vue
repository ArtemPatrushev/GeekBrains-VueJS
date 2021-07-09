<template>
  <div>
    <button @click="showPaymentForm = !showPaymentForm">ADD NEW COST+</button>
    <AddPaymentForm @addNewPayment="newPayment" v-show="showPaymentForm" />
    <PaymentsList :payments="currentPagePayments" />
    <Pagination :paymentsPerPage="paymentsPerPage" @pageChange="changePage" />
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

import PaymentsList from "../components/PaymentsList.vue";
import AddPaymentForm from "../components/AddPaymentForm.vue";
import Pagination from "../components/Pagination.vue";

export default {
  name: "PageDashboard",

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
    ...mapGetters({ paymentsList: "getFetchedPayments" }),

    currentPagePayments() {
      const { currentPage, paymentsList, paymentsPerPage } = this;
      let startIndex = (currentPage - 1) * paymentsPerPage;
      const paymentsToDisplay = paymentsList.slice(
        startIndex,
        startIndex + paymentsPerPage
      );
      return paymentsToDisplay;
    },
  },

  methods: {
    ...mapMutations(["addNewPayment"]),
    ...mapActions(["fetchData"]),

    newPayment(newPayment) {
      this.addNewPayment(newPayment);
    },

    changePage(number) {
      this.currentPage = number;
      this.$router.push({ path: `/dashboard/${number}` });
    },
  },

  created() {
    this.currentPage = Number(this.$route.params.page) || 1;

    this.fetchData(this.currentPage);
  },
};
</script>

<style>
</style>