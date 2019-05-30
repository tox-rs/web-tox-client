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
    FileChunkRequest(context, value) {
      if (value.length === 0) {
        return;
      }
      const data = context.rootState.info.avatar.slice(
        value.position,
        value.position + value.length,
      );
      const b64encoded = btoa(String.fromCharCode.apply(null, data));
      context.dispatch(
        'requests/user/SendFileChunk',
        {
          friend: value.friend,
          file_number: value.file_number,
          position: value.position,
          data: b64encoded,
        },
        { root: true },
      );
    },
  },
};
