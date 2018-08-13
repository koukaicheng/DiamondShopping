import Vue from 'vue';

const Loading = Vue.extend(require('./Loading.vue'));
let instance;

export default {
  open() {
    if (!instance) {
      instance = new Loading({
        el: document.createElement('div')
      });
    }
    if (instance.visible) return;
    document.body.appendChild(instance.$el);

    Vue.nextTick(() => {
      instance.visible = true;
    });
  },

  close() {
    if (instance) {
      instance.visible = false;
    }
  }
};
