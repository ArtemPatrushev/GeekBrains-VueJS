<template>
  <v-card max-width="180px" class="pa-2">
    <v-menu transition="scale-transition" offset-x min-width="auto" absolute>
      <template #activator="{ on }">
        <v-text-field
          v-model="dateToHTML"
          label="Date"
          v-on="on"
          class="mt-0"
        ></v-text-field>
      </template>
      <v-date-picker v-model="dateToHTML"></v-date-picker>
    </v-menu>

    <v-select
      :items="getCategoriesList"
      label="Category"
      v-model="item.category"
    ></v-select>

    <v-text-field label="Amount" v-model.number="item.amount"></v-text-field>

    <v-btn small depressed color="success" @click="updatePayment">Save</v-btn>
    <v-btn small outlined color="error" class="ml-2" @click="closeForm"
      >Cancel</v-btn
    >
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "EditPaymentForm",
  data() {
    return {
      dateToHTML: "",
    };
  },
  props: {
    item: Object,
    settings: Object,
  },

  computed: {
    ...mapGetters(["getCategoriesList"]),
    dateWithCorrectTimezone() {
      const offset = new Date().getTimezoneOffset() * 60000;
      return new Date(new Date(this.item.date).getTime() - offset)
        .toISOString()
        .slice(0, 10);
    },
  },

  methods: {
    updatePayment() {
      this.$context.emitAction(
        { ...this.item, date: this.dateToHTML },
        this.settings.name + this.settings.itemName
      );

      this.$context.hide();
    },
    closeForm() {
      this.$context.hideContentWindow();
    },
  },

  mounted() {
    this.dateToHTML = this.dateWithCorrectTimezone;
  },
};
</script>

<style lang="sass" scoped>
div
  background-color: #fff
</style> 