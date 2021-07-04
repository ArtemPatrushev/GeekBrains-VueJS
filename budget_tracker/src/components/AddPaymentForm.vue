<template>
  <div>
    <input type="text" placeholder="Date" v-model="date" />
    <input type="text" placeholder="Category" v-model.trim="category" />
    <input type="text" placeholder="Amount" v-model.number="amount" />
    <button @click="sendPayment">Save</button>
  </div>
</template>

<script>
export default {
  name: "AddPaymentForm",
  data() {
    return {
      amount: "",
      category: "",
      date: "",
    };
  },

  computed: {
    getCurrentDate() {
      const today = new Date();
      // Добавляем ноль к дню и месяцу если число меньше 10-ти
      const d =
        today.getDate().toString().length > 1
          ? today.getDate()
          : "0" + today.getDate().toString();
      const m =
        (today.getMonth() + 1).toString().length > 1
          ? today.getMonth() + 1
          : "0" + (today.getMonth() + 1).toString();
      const y = today.getFullYear();
      return `${d}.${m}.${y}`;
    },
  },

  methods: {
    sendPayment() {
      const { category, amount } = this;

      const data = {
        amount,
        category,
        date: this.date || this.getCurrentDate,
      };

      this.$emit("addNewPayment", data);
    },
  },
};
</script>

<style>
</style>