<template>
  <div>
    <button @click="showPaymentForm = !showPaymentForm">ADD NEW COST+</button>
    <br />
    <button @click="quickPayment('Food', 200)">Quick payment - Food 200</button>
    <br />
    <button @click="quickPayment('Transport', 50)">
      Quick payment - Transport 50
    </button>
    <br />
    <button @click="quickPayment('Entertainment', 2000)">
      Quick payment - Entertainment 2000
    </button>
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

    quickPayment(category, value) {
      this.$router.push({ path: `/add/payment/${category}?value=${value}` });
    },
  },

  created() {
    this.currentPage = Number(this.$route.params.page) || 1;
    this.fetchData(this.currentPage);

    this.showPaymentForm = this.$attrs.showPaymentForm || false;
  },
};
</script>

<style>
</style>