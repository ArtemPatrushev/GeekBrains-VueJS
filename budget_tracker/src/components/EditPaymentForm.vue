<template>
  <div>
    <input type="text" v-model="item.date" />
    <select v-model="item.category">
      <option
        v-for="(option, index) in getCategoriesList"
        :value="option"
        :key="index"
      >
        {{ option }}
      </option>
    </select>
    <input type="text" placeholder="Amount" v-model.number="item.amount" />
    <button @click="updatePayment">Save</button>
    <button @click="closeForm">Cancel</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "EditPaymentForm",
  props: {
    item: Object,
    settings: Object,
  },

  computed: {
    ...mapGetters(["getCategoriesList"]),
  },

  methods: {
    updatePayment() {
      this.$context.emitAction(
        this.item,
        this.settings.name + this.settings.itemName
      );

      this.closeForm();
      this.$context.hide();
    },
    closeForm() {
      this.$context.hideContentWindow();
    },
  },
};
</script>

<style>
</style>