<template>
  <div class="wrapper">
    <v-btn
      plain
      small
      v-for="action in actions"
      :key="action.name"
      @click="choseAction(action, $event)"
    >
      {{ action.name }}
    </v-btn>
    <v-btn plain small color="error" @click="$context.hide()">Cancel </v-btn>

    <v-menu
      offset-x
      :close-on-content-click="false"
      :close-on-click="true"
      v-model="showContextWindow"
      :position-x="x"
      :position-y="y"
      content-class="elevation-2"
    >
      <component :is="contextWindowContent" :item="item" :settings="settings" />
    </v-menu>
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
      showContextWindow: false,
      x: 0,
      y: 0,
    };
  },

  methods: {
    choseAction(action, e) {
      this.$set(this, "settings", action);
      this.contextWindowContent = action.comp;
      this.x = e.clientX;
      this.y = e.clientY;
      if (this.showContextWindow) return;
      this.showContextWindow = true;
    },

    onHideContentWindow() {
      this.contextWindowContent = "";
      this.showContextWindow = false;
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
  position: relative

.menu
  padding: 10px 0
  background-color: #fff
</style>