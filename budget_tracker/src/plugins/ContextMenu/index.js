export default {
  install(Vue) {
    if (this.installed) {
      return
    }

    this.installed = true;

    Vue.prototype.$context = {
      EventBus: new Vue(),
      show(item, actions) {
        this.EventBus.$emit('show', { item, actions })
      },

      hide() {
        this.EventBus.$emit('hide');
      },

      hideContentWindow() {
        this.EventBus.$emit('hideContentWindow');
      },

      emitAction(item, action) {
        action = action.toLowerCase()
        this.EventBus.$emit(`${action}`, item);
      }
    }
  }
}