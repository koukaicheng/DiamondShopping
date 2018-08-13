// import Vue from 'vue'
import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
export default () => {
  const store = new Vuex.Store({
    namespaced: true,
    state: defaultState,
    mutations
  });
  return store;
}

