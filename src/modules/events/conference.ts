import { Module } from 'vuex';
import { db } from '@/store';
export const conference: Module<any, any> = {
  namespaced: true,
  actions: {
    test(context, value) {
      console.log('conferenceEventsActions');
      console.log(context);
    },
    ConferenceInvite(context, value) {
        context.commit('event' + value.event, value, { root: true });
    },
    ConferenceConnected(context, value) {
        // context.commit('event' + value.event, value, { root: true });
        // db.addRoom(context.rootState.rooms[context.rootState.conferenceRooms[value.conference]]);
    },
    ConferenceMessage(context, value) {
        context.commit('event' + value.event, value, { root: true });
        db.updateRoom(context.rootState.rooms[context.rootState.conferenceRooms[value.conference]]);
    },
    ConferenceTitle(context, value) {
        context.commit('event' + value.event, value, { root: true });
        db.updateRoom(context.rootState.rooms[context.rootState.conferenceRooms[value.conference]]);
    },
    ConferencePeerName(context, value) {
        context.commit('event' + value.event, value, { root: true });
        db.updateRoom(context.rootState.rooms[context.rootState.conferenceRooms[value.conference]]);
    },
    ConferencePeerListChanged(context, value) {
      context.dispatch('requests/conference/GetPeerList', value.conference, { root: true });
    },
  },
};
