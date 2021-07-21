<template>
  <div>
    <button @click="showPaymentForm = !showPaymentForm">ADD NEW COST+</button>
    <br />
    <transition name="fade">
      <AddPaymentForm @addNewPayment="newPayment" v-show="showPaymentForm" />
    </transition>
    <PaymentsList :payments="currentPagePayments" />
    <Pagination :paymentsPerPage="paymentsPerPage" @pageChange="changePage" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

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
      paymentsPerPage: 5,
      currentPage: this.$route?.params.page || 1,
      showPaymentForm: false,
    };
  },

  computed: {
    ...mapGetters({ paymentsList: "getPayments" }),

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
    ...mapActions([
      "fetchData",
      "addNewPayment",
      "editPayment",
      "deletePayment",
    ]),

    newPayment(newPayment) {
      this.addNewPayment(newPayment);
      if (this.$route.path !== "/dashboard") {
        this.$router.push({ path: "/dashboard" });
      }
    },

    changePage(number) {
      this.currentPage = number;
      this.$router.push({ path: `/dashboard/${number}` });
    },

    removePayment(payment) {
      this.deletePayment(payment);
    },

    updatePayment(payment) {
      this.editPayment(payment);
    },
  },

  created() {
    if (!this.paymentsList.length) {
      this.fetchData(this.currentPage, this.paymentsPerPage);
    }
  },

  mounted() {
    this.$context?.EventBus.$on("deletepayment", this.removePayment);
    this.$context?.EventBus.$on("editpayment", this.updatePayment);
  },
};
</script>

<style lang="sass">
.fade-enter-active, .fade-leave-active
  transition: opacity .3s

.fade-enter, .fade-leave-to
  opacity: 0
</style>