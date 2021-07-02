<template>
  <div id="app">
    <button @click="showPaymentForm = !showPaymentForm">ADD NEW COST+</button>
    <AddPaymentForm
      @addNewPayment="addPaymentToList"
      v-show="showPaymentForm"
    />
    <PaymentsList :payments="payments" />
  </div>
</template>

<script>
import PaymentsList from "./components/PaymentsList.vue";
import AddPaymentForm from "./components/AddPaymentForm.vue";

export default {
  name: "App",
  components: {
    PaymentsList,
    AddPaymentForm,
  },

  data() {
    return {
      showPaymentForm: false,
      payments: [
        {
          amount: 56,
          category: "Sport",
          date: "02.07.2021",
        },
        {
          amount: 100,
          category: "Food",
          date: "27.06.2021",
        },
        {
          amount: 2400,
          category: "House",
          date: "23.06.2021",
        },
        {
          amount: 300,
          category: "Sport",
          date: "19.06.2021",
        },
      ],
    };
  },

  methods: {
    addPaymentToList(newPayment) {
      this.payments = [...this.payments, newPayment];
    },
  },
};
</script>

<style lang="scss">
</style>
