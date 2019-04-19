import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const arr: string[] = [];

export default new Vuex.Store({
  state: {
    msg: '',
    msgs: arr,
    selectedTab: 'tab-person',
  },
  mutations: {
    SAVE_MSG(state, value) {
      state.msg = value;
      state.msgs.push(state.msg);
    },
    SELECT_TAB(state, value) {
      state.selectedTab = value;
    }
  },
  actions: {
    saveMsg(context, value) {
      context.commit('SAVE_MSG', value);
    },
    selectTab(context, value) {
      context.commit('SELECT_TAB', value);
    }
  },
});
