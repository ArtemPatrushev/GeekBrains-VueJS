<template>
  <div>
    {{ settings.name }} {{ settings.itemName }}? <br />
    <button @click="confirmAction">Yes</button>
    <button @click="closeWindow">Cancel</button>
  </div>
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

<style>
</style>