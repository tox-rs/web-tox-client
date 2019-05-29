import { Module } from 'vuex';
import { db } from '@/store';
export const user: Module<any, any> = {
  namespaced: true,
  actions: {
    Ok(context, value) {
      // "response": "Ok"
      context.dispatch('requests/user/Info', {}, { root: true });
    },
    MessageSent(context, value) {
      // "response": "MessageSent",
      // "message_id": number
      context.commit('response' + value.res.response, value, { root: true });
      db.updateRoom(
        context.rootState.rooms[
          context.rootState.friendRooms[value.req.friend]
        ],
      );
    },
    Info(context, value) {
      // "response": "Info",
      // "tox_id": string,
      // "name": string,
      // "status": UserStatus,
      // "status_message": string
      // "friends": FriendInfo[],
      context.commit('response' + value.res.response, value.res, {
        root: true,
      });
      db.updateInfo(context.rootState.info);
      context.commit(
        'UPDATE_ROOM_LIST',
        {},
        {
          root: true,
        },
      );
      context.rootState.info.friends.forEach((element: any) => {
        db.updateRoom(
          context.rootState.rooms[
            context.rootState.friendRooms[element.number]
          ],
        );
      });
    },
    ConnectionStatus(context, value) {
      // "response": "ConnectionStatus"
      // "status": ConnectionStatus
      context.commit('response' + value.res.response, value.res, {
        root: true,
      });
    },
    Address(context, value) {
      // "response": "Address"
      // "address": string
      context.commit('response' + value.res.response, value.res, {
        root: true,
      });
    },
    Nospam(context, value) {
      // "response": "Nospam"
      // "nospam": string
      context.commit('response' + value.res.response, value.res, {
        root: true,
      });
      db.updateInfo(context.rootState.info);
    },
    PublicKey(context, value) {
      // "response": "PublicKey"
      // "public_key": string
      context.commit('response' + value.res.response, value.res, {
        root: true,
      });
    },
    Name(context, value) {
      // "response": "Name"
      // "name": string
      context.commit('response' + value.res.response, value.res, {
        root: true,
      });
    },
    StatusMessage(context, value) {
      // "response": "StatusMessage"
      // "status": string
      context.commit('response' + value.res.response, value.res, {
        root: true,
      });
    },
    Status(context, value) {
      // "response": "Status"
      // "status": UserStatus
      context.commit('response' + value.res.response, value.res, {
        root: true,
      });
    },
  },
};
