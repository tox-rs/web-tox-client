import { Module } from 'vuex';
export const friend: Module<any, any> = {
  namespaced: true,
  actions: {
    test(context, value) {
      console.log('friendResponsesActions');
      console.log(context.rootState);
    },
    Friend(context, value) {
      // "response": "Friend"
      // "friend": number
    },
    FriendExists(context, value) {
      // "response": "FriendExists"
      // "exists": boolean
    },
    LastOnline(context, value) {
      // "response": "LastOnline"
      // "last_online": number
    },
  },
};
