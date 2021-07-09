<template>
  <div>
    <button v-for="n in pages" :key="n" @click="changePage(n)">
      {{ n }}
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Pagination",
  props: {
    paymentsPerPage: Number,
  },

  computed: {
    ...mapGetters(["getTotalPayments", "getFetchedPaymentsLength"]),
    pages() {
      return Math.ceil(this.getTotalPayments / this.paymentsPerPage);
    },
  },

  methods: {
    ...mapActions(["fetchData"]),
    changePage(number) {
      this.fetchData(number);
      this.$emit("pageChange", number);
    },
  },
};
</script>

<style>
</style>