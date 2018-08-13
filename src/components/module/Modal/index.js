import Vue from 'vue'
import tsModal from './Modal.vue'

const ModalConstructor = Vue.extend(tsModal);

let currentMsg, instance;
let msgQueue = [];

const defaultCallback = action => {
  if (currentMsg) {
    let callback = currentMsg.callback;
    if (typeof callback === 'function') {
      callback(action);
    }
    if (currentMsg.resolve) {
      if (action === 'confirm') {
        currentMsg.resolve(action);
      } else if (action === 'cancel' && currentMsg.reject) {
        currentMsg.reject(action);
      }
    }
  }
};

const initInstance = () => {
  instance = new ModalConstructor({
    el: document.createElement('div')
  });
};

const showNextMsg = () => {
  if (!instance) {
    initInstance();
  }
  instance.action = '';

  if (!instance.visible) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();

      let options = currentMsg.options;
      for (let prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }
      if (options.callback === undefined) {
        instance.callback = defaultCallback;
      }

      document.body.appendChild(instance.$el);

      Vue.nextTick(() => {
        instance.visible = true;
      });
    }
  }
};

const Modal = (options, callback) => {
  if (typeof options === 'string') {
    options = {message: options};
  } else if (options.callback && !callback) {
    callback = options.callback;
  }
  options.theme = options.theme || 'box';
  if (typeof Promise !== 'undefined') {
    return new Promise((resolve, reject) => {
      let msgObj = {
        options,
        callback,
        resolve,
        reject
      };
      if (!options.cancel) {
        delete msgObj.reject;
      }
      msgQueue.push(msgObj);
      showNextMsg();
    });
  }
};

Modal.alert = ({message, title = '提示', lock = false}) => {
  return Modal({message, title, lock, theme: 'alert'})
};


export default Modal
