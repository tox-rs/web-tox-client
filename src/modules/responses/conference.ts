import { Module } from 'vuex';
import { db } from '@/store';
export const conference: Module<any, any> = {
  namespaced: true,
  actions: {
    Conference(context, value) {
      // "response": "Conference",
      // "conference": number
      context.commit('response' + value.res.response, value.res, {
        root: true,
      });
      db.addRoom(
        context.rootState.rooms[
          context.rootState.conferenceRooms[value.res.conference]
        ],
      );
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
    ConferenceList(context, value) {
      // "response": "ConferenceList"
      // "conferences": ConferenceInfo[]
      value.res.conferences.forEach((element: any) => {
        if (context.rootState.conferenceRooms[element.number] === undefined) {
          context.commit(
            'ADD_CONFERENCE_ROOM',
            {
              conference: element.number,
              name: element.title || 'Group ' + element.number,
              peers: element.peers,
            },
            { root: true },
          );
          db.addRoom(
            context.rootState.rooms[
              context.rootState.conferenceRooms[element.number]
            ],
          );
        } else {
          context.commit(
            'UPDATE_CONFERENCE_ROOM',
            {
              conference: element.number,
              name: element.title || 'Group ' + element.number,
              peers: element.peers,
            },
            { root: true },
          );
          db.updateRoom(
            context.rootState.rooms[
              context.rootState.conferenceRooms[element.number]
            ],
          );
        }
      });
    },
    ConferenceType(context, value) {
      // "response": "ConferenceType",
      // "kind": ConferenceType
    },
    ConferencePeerList(context, value) {
      // "response": "PeerList"
      // "peers": PeerInfo[]
      context.commit('response' + value.res.response, value, {
        root: true,
      });
    },
  },
};
