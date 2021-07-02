<template>
  <div>
    <button v-for="n in pages" :key="n" @click="sendPageNumber(n)">
      {{ n }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    paymentsLength: {
      type: Number,
    },
  },

  computed: {
    pages() {
      return Math.ceil(this.paymentsLength / 5);
    },
  },

  methods: {
    sendPageNumber(number) {
      this.$emit("pageClick", number);
    },
  },
};
</script>

<style>
</style>