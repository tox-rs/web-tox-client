import { Module } from 'vuex';
import { client } from '@/store';
import { ToxRequest } from 'ws-tox-protocol';
export const friend: Module<any, any> = {
  namespaced: true,
  actions: {

    FriendByPublicKey(context, value) {
      // "request": "FriendByPublicKey"
      // "public_key": string
      const request = {
        request: 'FriendByPublicKey',
        public_key: value,
      } as ToxRequest;
      client.sendToxRequset(request);
    },
    FriendExists(context, value) {
      // "request": "FriendExists"
      // "friend": number
      const request = {
        request: 'FriendExists',
        friend: value,
      } as ToxRequest;
      client.sendToxRequset(request);
    },
    GetFriendPublicKey(context, value) {
      // "request": "GetFriendPublicKey"
      // "friend": number
      const request = {
        request: 'GetFriendPublicKey',
        friend: value,
      } as ToxRequest;
      client.sendToxRequset(request);
    },
    GetFriendLastOnline(context, value) {
      // "request": "GetFriendLastOnline"
      // "friend": number
      const request = {
        request: 'GetFriendLastOnline',
        friend: value,
      } as ToxRequest;
      client.sendToxRequset(request);
    },
    GetFriendName(context, value) {
      // "request": "GetFriendName"
      // "friend": number
      const request = {
        request: 'GetFriendName',
        friend: value,
      } as ToxRequest;
      client.sendToxRequset(request);
    },
    GetFriendStatusMessage(context, value) {
      // "request": "GetFriendStatusMessage"
      // "friend": number
      const request = {
        request: 'GetFriendStatusMessage',
        friend: value,
      } as ToxRequest;
      client.sendToxRequset(request);
    },
    GetFriendStatus(context, value) {
      // "request": "GetFriendStatus"
      // "friend": number
      const request = {
        request: 'GetFriendStatus',
        friend: value,
      } as ToxRequest;
      client.sendToxRequset(request);
    },
    GetFriendConnectionStatus(context, value) {
      // "request": "GetFriendConnectionStatus"
      // "friend": number
      const request = {
        request: 'GetFriendConnectionStatus',
        friend: value,
      } as ToxRequest;
      client.sendToxRequset(request);
    },
    AddFriend(context, value) {
      // "request": "AddFriend",
      // "tox_id": string,
      // "message": string
      const request = {
        request: 'AddFriend',
        tox_id: value.tox_id,
        message: value.message || 'Hello',
      } as ToxRequest;
      client.sendToxRequset(request);
    },
    AddFriendNorequest(context, value) {
      // "request": "AddFriendNorequest",
      // "tox_id": string
      const request = {
        request: 'AddFriendNorequest',
        tox_id: value,
      } as ToxRequest;
      client.sendToxRequset(request);
    },
    SendFriendMessage(context, value) {
      // "request": "SendFriendMessage",
      // "friend": number,
      // "kind": MessageType,
      // "message": string
      const request = {
        request: 'SendFriendMessage',
        friend: value.friend,
        kind: 'Normal',
        message: value.message,
      } as ToxRequest;
      client.sendToxRequset(request);
    },
    DeleteFriend(context, value) {
      // "request": "DeleteFriend"
      // "friend": number
      const request = {
        request: 'DeleteFriend',
        friend: value,
      } as ToxRequest;
      client.sendToxRequset(request);
    },
  },
};
