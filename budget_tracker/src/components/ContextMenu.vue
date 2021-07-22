<template>
  <div class="wrapper">
    <v-menu offset-y v-for="(action, index) in actions" :key="index">
      <template #activator="{ on }">
        <v-btn v-on="on" @click="choseAction(action)" depressed class="mb-2">
          {{ action.name }}
        </v-btn>
      </template>
      <component :is="contextWindowContent" :item="item" :settings="settings" />
    </v-menu>
    <!-- <div class="menu">
      <button
        class="menu-btn"
        v-for="(action, index) in actions"
        :key="index"
        @click="choseAction(action)"
      >
        {{ action.name }}
      </button>

      <component :is="contextWindowContent" :item="item" :settings="settings" /> -->
    <!-- </div> -->
  </div>
</template>

<script>
import EditPaymentForm from "./EditPaymentForm.vue";
import ConfirmWindow from "./ConfirmWindow.vue";
export default {
  name: "ContextMenu",
  components: {
    EditPaymentForm,
    ConfirmWindow,
  },

  props: {
    actions: Array,
    item: Object,
  },

  data() {
    return {
      contextWindowContent: "",
      settings: null,
    };
  },

  methods: {
    choseAction(action) {
      this.$set(this, "settings", action);
      this.contextWindowContent = action.comp;
    },

    onHideContentWindow() {
      this.contextWindowContent = "";
    },
  },

  mounted() {
    this.$context.EventBus.$on("hideContentWindow", this.onHideContentWindow);
  },
};
</script>

<style scoped lang="sass">
.wrapper
  max-width: 150px
  display: flex
  flex-direction: column
  background-color: #fff

.menu

  padding: 10px 0
  box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.49)
  background-color: #fff
</style>