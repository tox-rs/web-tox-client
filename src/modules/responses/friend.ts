import { Module } from 'vuex';
export const friend: Module<any, any> = {
  namespaced: true,
  actions: {
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
