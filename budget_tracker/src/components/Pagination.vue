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
    ...mapGetters(["getPaymentsLength"]),
    pages() {
      return Math.ceil(this.getPaymentsLength / this.paymentsPerPage);
    },
  },

  methods: {
    ...mapActions(["fetchData"]),
    changePage(number) {
      if (number > Math.ceil(this.getPaymentsLength / this.paymentsPerPage)) {
        this.fetchData(number, this.paymentsPerPage);
      }
      this.$emit("pageChange", number);
    },
  },
};
</script>

<style>
</style>