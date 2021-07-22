<template>
  <v-card class="pa-10">
    <h2 class="mb-4 text-h4">Add New Payment</h2>
    <v-menu
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template #activator="{ on }">
        <v-text-field v-model="date" label="Date" v-on="on"></v-text-field>
      </template>
      <v-date-picker v-model="date"></v-date-picker>
    </v-menu>

    <v-select
      :items="getCategoriesList"
      label="Category"
      v-model="category"
    ></v-select>

    <v-text-field label="Amount" v-model.number="amount"></v-text-field>
    <v-btn @click="sendPayment">Save</v-btn>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "AddPaymentForm",
  data() {
    return {
      amount: "",
      category: "",
      date: new Date().toISOString().slice(0, 10),
    };
  },

  computed: {
    ...mapGetters(["getCategoriesList"]),
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
  },
};
</script>

<style>
</style>