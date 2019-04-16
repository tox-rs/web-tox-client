import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const arr: string[] = [];

export default new Vuex.Store({
  state: {
    msg: '',
    msgs: arr,
  },
  mutations: {
    SAVE_MSG(state, value) {
      state.msg = value;
      state.msgs.push(state.msg);
    },
  },
  actions: {
    saveMsg(context, value) {
      context.commit('SAVE_MSG', value);
    },
  },
});
