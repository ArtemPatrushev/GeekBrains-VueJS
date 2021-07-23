<template>
  <v-card class="pa-2">
    <v-card-title class="pa-2"
      >{{ settings.name }} {{ settings.itemName }}?</v-card-title
    >
    <v-card-actions>
      <v-btn small outlined color="success" @click="confirmAction">Yes</v-btn>
      <v-btn small depressed color="error" @click="closeWindow">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ConfirmWindow",
  props: {
    item: Object,
    settings: Object,
  },

  methods: {
    confirmAction() {
      this.$context.emitAction(
        this.item,
        this.settings.name + this.settings.itemName
      );
      this.closeWindow();
      this.$context.hide();
    },
    closeWindow() {
      this.$context.hideContentWindow();
    },
  },
};
</script>

<style lang="sass" scoped>
div
  background-color: #fff
</style>