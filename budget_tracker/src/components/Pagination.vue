<template>
  <div>
    <button v-for="n in 3" :key="n" @click="changePage(n)">
      {{ n }}
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Pagination",
  props: {
    paymentsLength: {
      type: Number,
    },
  },

  computed: {
    pages() {
      return Math.ceil(this.paymentsLength / 3);
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