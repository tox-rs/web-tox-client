import { Module } from 'vuex';
export const user: Module<any, any> = {
  namespaced: true,
  actions: {
    ConnectionStatus(context, value) {
      context.commit('event' + value.event, value, { root: true });
    },
    FileReceipt(context, value) {
      // "event": "FileReceipt"
      // "friend": number
      // "file_number": number
      // "kind": number
      // "file_size": number
      // "file_name": string
      context.dispatch('requests/user/ControlFile', value, { root: true });
    },
  },
};
