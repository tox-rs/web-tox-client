import { Module } from 'vuex';
import { client } from '@/store';
import { ToxRequest } from 'ws-tox-protocol';
export const conference: Module<any, any> = {
  namespaced: true,
  actions: {
    test(context, value) {
      console.log('conferenceRequestsActions');
      console.log(context.rootState);
    },
    NewConference(context, value) {
      // "request": "NewConference",
      const request = { request: 'NewConference' } as ToxRequest;
      client.sendToxRequset(request);
    },

    DeleteConference(context, value) {
      // "request": "DeleteConference",
      // "conference": number,
      const request = {
        request: 'DeleteConference',
        conference: value,
      } as ToxRequest;
      client.sendToxRequset(request);
    },

    ConferencePeerCount(context, value) {
      // "request": "ConferencePeerCount",
      // "conference": number,
      const request = {
        request: 'ConferencePeerCount',
        conference: value,
      } as ToxRequest;
      client.sendToxRequset(request);
    },

    GetPeerName(context, value) {
      // "request": "GetPeerName",
      // "conference": number,
      // "peer": number,
      const request = {
        request: 'GetPeerName',
        conference: value.conference,
        peer: value.peer,
      } as ToxRequest;
      client.sendToxRequset(request);
    },

    GetPeerPublicKey(context, value) {
      // "request": "GetPeerPublicKey",
      // "conference": number,
      // "peer": number,
      const request = {
        request: 'GetPeerPublicKey',
        conference: value.conference,
        peer: value.peer,
      } as ToxRequest;
      client.sendToxRequset(request);
    },

    IsOwnPeerNumber(context, value) {
      // "request": "IsOwnPeerNumber",
      // "conference": number,
      // "peer_number": number,
      const request = {
        request: 'IsOwnPeerNumber',
        conference: value.conference,
        peer_number: value.peer_number,
      } as ToxRequest;
      client.sendToxRequset(request);
    },

    InviteToConference(context, value) {
      // "request": "InviteToConference",
      // "friend": number,
      // "conference": number,
      const request = {
        request: 'InviteToConference',
        friend: value,
        conference:
          context.rootState.rooms[context.rootState.selectedRoom].conference,
      } as ToxRequest;
      client.sendToxRequset(request);
    },

    JoinConference(context, value) {
      // "request": "JoinConference",
      // "friend": number,
      // "cookie": string,
      const request = {
        request: 'JoinConference',
        friend: value.num,
        cookie: value.value,
      } as ToxRequest;
      client.sendToxRequset(request);
    },

    SendConferenceMessage(context, value) {
      // "request": "SendConferenceMessage",
      // "conference": number,
      // "kind": MessageType,
      // "message": string,
      const request = {
        request: 'SendConferenceMessage',
        conference: value.conference,
        kind: 'Normal',
        message: value.message,
      } as ToxRequest;
      client.sendToxRequset(request);
    },

    GetConferenceTitle(context, value) {
      // "request": "GetConferenceTitle",
      // "conference": number,
      const request = {
        request: 'GetConferenceTitle',
        conference: value.conference,
      } as ToxRequest;
      client.sendToxRequset(request);
    },

    SetConferenceTitle(context, value) {
      // "request": "SetConferenceTitle",
      // "conference": number,
      // "title": string,
      const request = {
        request: 'SetConferenceTitle',
        conference: value.conference,
        title: value.title,
      } as ToxRequest;
      client.sendToxRequset(request);
    },

    GetConferenceList(context, value) {
      // "request": "GetChatList",
      const request = { request: 'GetConferenceList' } as ToxRequest;
      client.sendToxRequset(request);
    },

    GetConferenceType(context, value) {
      // "request": "GetConferenceType",
      // "conference": number,
      const request = {
        request: 'GetConferenceType',
        conference: value,
      } as ToxRequest;
      client.sendToxRequset(request);
    },
    GetPeerList(context, value) {
      // "request": "GetPeerList"
      // "conference": number
      const request = {
        request: 'GetPeerList',
        conference: value,
      } as ToxRequest;
      client.sendToxRequset(request);
    },
  },
};
