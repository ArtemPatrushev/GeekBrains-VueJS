<template>
  <div>
    <input type="text" placeholder="Date" v-model="date" />
    <select v-model="category">
      <option
        v-for="(option, index) in getCategoriesList"
        :value="option"
        :key="index"
      >
        {{ option }}
      </option>
    </select>

    <input type="text" placeholder="Amount" v-model.number="amount" />
    <button @click="sendPayment">Save</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "AddPaymentForm",
  data() {
    return {
      amount: "",
      category: "Food",
      date: "",
    };
  },

  computed: {
    ...mapGetters(["getCategoriesList", "getTotalPayments"]),
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
    ...mapMutations(["increaseTotalPayments"]),
    sendPayment() {
      const { category, amount } = this;

      const data = {
        id: this.getTotalPayments + 1,
        amount,
        category,
        date: this.date || this.getCurrentDate,
      };
      this.increaseTotalPayments();
      this.$emit("addNewPayment", data);
    },
  },
};
</script>

<style>
</style>