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
    <transition name="fade">
      <AddPaymentForm @addNewPayment="newPayment" v-show="showPaymentForm" />
    </transition>
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
      paymentsPerPage: 3,
      page: this.currentPage,
    };
  },

  props: {
    showPaymentForm: {
      type: Boolean,
      default: () => false,
    },
    currentPage: {
      type: Number,
      default: () => 1,
    },
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
    ...mapMutations([
      "addNewPayment",
      "removePayment",
      "updatePayment",
      "decreaseTotalPayments",
    ]),
    ...mapActions(["fetchData"]),

    newPayment(newPayment) {
      this.addNewPayment(newPayment);
    },

    changePage(number) {
      this.page = number;
      this.$router.push({ path: `/dashboard/${number}` });
    },

    quickPayment(category, value) {
      this.$router.push({ path: `/add/payment/${category}?value=${value}` });
    },

    deletePayment(payment) {
      this.removePayment(payment.id);
      this.decreaseTotalPayments();
    },

    editPayment(payment) {
      this.updatePayment(payment);
    },
  },

  created() {
    if (!this.paymentsList.length) {
      this.fetchData(this.currentPage);
    }
  },

  mounted() {
    this.$context.EventBus.$on("deletepayment", this.deletePayment);
    this.$context.EventBus.$on("editpayment", this.editPayment);
  },
};
</script>

<style lang="sass">
.fade-enter-active, .fade-leave-active
  transition: opacity .3s

.fade-enter, .fade-leave-to
  opacity: 0
</style>