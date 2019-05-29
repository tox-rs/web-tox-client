import { Module } from 'vuex';
import { db } from '@/store';
export const friend: Module<any, any> = {
  namespaced: true,
  actions: {
    FriendRequest(context, value) {
      const data = Array.from(value.public_key, (byte: any) => {
        // tslint:disable-next-line: no-bitwise
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
      }).join('');
      value.public_key = data.toUpperCase();
      context.commit('event' + value.event, value, { root: true });
    },
    FriendMessage(context, value) {
      context.commit('event' + value.event, value, { root: true });
      db.updateRoom(
        context.rootState.rooms[context.rootState.friendRooms[value.friend]],
      );
    },
    FriendName(context, value) {
      context.commit('event' + value.event, value, { root: true });
      context.commit(
        'UPDATE_FRIEND_ROOM',
        {
          name: value.name,
          friend: value.friend,
        },
        { root: true },
      );
      db.updateInfo(context.rootState.info);
      db.updateRoom(
        context.rootState.rooms[
          context.rootState.friendRooms[value.friend]
        ],
      );
    },
    FriendStatusMessage(context, value) {
      context.commit('event' + value.event, value, { root: true });
      db.updateInfo(context.rootState.info);
    },
    FriendStatus(context, value) {
      context.commit('event' + value.event, value, { root: true });
      db.updateInfo(context.rootState.info);
    },
    FriendConnectionStatus(context, value) {
      context.commit('event' + value.event, value, { root: true });
      db.updateInfo(context.rootState.info);
    },
    FriendTyping(context, value) {
      context.commit('event' + value.event, value, { root: true });
    },
    FriendReadReceipt(context, value) {
      context.commit('event' + value.event, value, { root: true });
      db.updateRoom(
        context.rootState.rooms[context.rootState.friendRooms[value.friend]],
      );
    },
  },
};
