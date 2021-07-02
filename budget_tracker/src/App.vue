<template>
  <div id="app">
    <button @click="showPaymentForm = !showPaymentForm">ADD NEW COST+</button>
    <AddPaymentForm
      @addNewPayment="addPaymentToList"
      v-show="showPaymentForm"
    />
    <PaymentsList :payments="currentPagePayments" />
    <Pagination :paymentsLength="payments.length" @pageClick="changePage" />
  </div>
</template>

<script>
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
      paymentsPerPage: 5,
      currentPage: 1,
      payments: [
        {
          amount: 56,
          category: "Sport",
          date: "02.07.2021",
          id: 1,
        },
        {
          amount: 100,
          category: "Food",
          date: "27.06.2021",
          id: 2,
        },
        {
          amount: 2400,
          category: "House",
          date: "23.06.2021",
          id: 3,
        },
        {
          amount: 300,
          category: "Sport",
          date: "19.06.2021",
          id: 4,
        },
        {
          amount: 500,
          category: "Food",
          date: "13.06.2021",
          id: 5,
        },
        {
          amount: 56,
          category: "Sport",
          date: "02.07.2021",
          id: 6,
        },
        {
          amount: 100,
          category: "Food",
          date: "27.06.2021",
          id: 7,
        },
        {
          amount: 2400,
          category: "House",
          date: "23.06.2021",
          id: 8,
        },
        {
          amount: 300,
          category: "Sport",
          date: "19.06.2021",
          id: 9,
        },
        {
          amount: 500,
          category: "Food",
          date: "13.06.2021",
          id: 10,
        },
        {
          amount: 56,
          category: "Sport",
          date: "02.07.2021",
          id: 11,
        },
        {
          amount: 100,
          category: "Food",
          date: "27.06.2021",
          id: 12,
        },
        {
          amount: 2400,
          category: "House",
          date: "23.06.2021",
          id: 13,
        },
      ],
    };
  },

  computed: {
    currentPagePayments() {
      const { currentPage, payments, paymentsPerPage } = this;
      const startIndex = (currentPage - 1) * paymentsPerPage;
      const paymentsToDisplay = payments.slice(
        startIndex,
        startIndex + paymentsPerPage
      );
      return paymentsToDisplay;
    },
  },

  methods: {
    addPaymentToList(newPayment) {
      newPayment.id = this.payments.length + 1;
      this.payments = [...this.payments, newPayment];
    },
    changePage(number) {
      this.currentPage = number;
    },
  },
};
</script>

<style lang="scss">
</style>
