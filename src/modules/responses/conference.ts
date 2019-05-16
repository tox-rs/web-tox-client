import { Module } from 'vuex';
import { db } from '@/store';
export const conference: Module<any, any> = {
  namespaced: true,
  actions: {
    test(context, value) {
      console.log('conferenceResponsesActions');
      console.log(context.rootState);
    },
    Conference(context, value) {
      // "response": "Conference",
      // "conference": number
      context.commit('response' + value.res.response, value.res, { root: true });
      db.addRoom(context.rootState.rooms[context.rootState.conferenceRooms[value.res.conference]]);
    },
    ConferencePeerCount(context, value) {
      // "response": "ConferencePeerCount",
      // "count": number
    },
    ConferencePeerName(context, value) {
      // "response": "ConferencePeerName",
      // "name": string
    },
    ConferencePeerPublicKey(context, value) {
      // "response": "ConferencePeerPublicKey",
      // "public_key": string,
    },
    IsOwnPeerNumber(context, value) {
      // "response": "IsOwnPeerNumber",
      // "is_own": boolean,
    },
    ConferenceTitle(context, value) {
      // "response": "ConferenceTitle",
      // "title": string,
    },
    ChatList(context, value) {
      // "response": "ChatList",
      // "list": number[]
    },
    ConferenceType(context, value) {
      // "response": "ConferenceType",
      // "kind": ConferenceType
    },
  },
};
