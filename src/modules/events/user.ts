import { Module } from 'vuex';
export const user: Module<any, any> = {
  namespaced: true,
  actions: {
    test(context, value) {
      console.log('userEventsActions');
      console.log(context.rootState);
    },
    ConnectionStatus(context, value) {
        context.commit('event' + value.event, value, { root: true });
    },
  },
};
