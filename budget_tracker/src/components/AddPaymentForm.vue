<template>
  <div>
    <input type="date" placeholder="Date" v-model="date" />
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
import { mapGetters } from "vuex";
export default {
  name: "AddPaymentForm",
  data() {
    return {
      amount: "",
      category: "Food",
      date: new Date().toISOString().slice(0, 10),
    };
  },

  computed: {
    ...mapGetters(["getCategoriesList", "getTotalPayments"]),
  },

  methods: {
    sendPayment() {
      const { category, amount } = this;

      const data = {
        id: Date.now(new Date()),
        amount,
        category,
        date: this.date,
      };
      this.$emit("addNewPayment", data);
    },

    acceptQuickPayment() {
      if (this.$route.params.category) {
        this.category = this.$route.params.category;
      }

      if (this.$route.query.value) {
        this.amount = this.$route.query.value;
        this.sendPayment();
      }
    },
  },

  watch: {
    $route() {
      this.acceptQuickPayment();
    },
  },

  mounted() {
    this.acceptQuickPayment();
  },
};
</script>

<style>
</style>