import { Module } from 'vuex';
import { client } from '@/store';
import { ToxRequest } from 'ws-tox-protocol';
export const user: Module<any, any> = {
  namespaced: true,
  actions: {
    Info(context, value) {
      // "request": "Info",
      const request = { request: 'Info' } as ToxRequest;
      client.sendToxRequset(request);
    },
    SetInfo(context, value) {
      // "request": "SetInfo"
      // "nospam": string
      // "name": string
      // "status": UserStatus
      // "status_message": string
      // "friends": string[]
      let arr = [];
      if (context.rootState.info.friends.length > 0) {
        arr = context.rootState.info.friends.map((friend: any) => {
          return friend.public_key;
        });
      }
      const request = {
        request: 'SetInfo',
        nospam: context.rootState.info.nospam,
        name: context.rootState.info.name,
        status: context.rootState.info.status,
        status_message: context.rootState.info.status_message,
        friends: arr,
      } as ToxRequest;
      client.sendToxRequset(request);
    },
    GetConnectionStatus(context, value) {
      // "request": "GetConnectionStatus"
      const request = { request: 'GetConnectionStatus' } as ToxRequest;
      client.sendToxRequset(request);
    },
    GetAddress(context, value) {
      // "request": "GetAddress"
      const request = { request: 'GetAddress' } as ToxRequest;
      client.sendToxRequset(request);
    },
    GetNospam(context, value) {
      // "request": "GetNospam"
      const request = { request: 'GetNospam' } as ToxRequest;
      client.sendToxRequset(request);
    },
    SetNospam(context, value) {
      // "request": "SetNospam"
      // "nospam": string
      const request = {
        request: 'SetNospam',
        nospam: value,
      } as ToxRequest;
      client.sendToxRequset(request);
    },
    GetPublicKey(context, value) {
      // "request": "GetPublicKey"
      const request = { request: 'GetPublicKey' } as ToxRequest;
      client.sendToxRequset(request);
    },
    SetName(context, value) {
      // "request": "SetName"
      // "name": string
      const request = {
        request: 'SetName',
        name: value,
      } as ToxRequest;
      client.sendToxRequset(request);
    },
    GetName(context, value) {
      // "request": "GetName"
      const request = { request: 'GetName' } as ToxRequest;
      client.sendToxRequset(request);
    },
    SetStatusMessage(context, value) {
      // "request": "SetStatusMessage"
      // "message": string
      const request = {
        request: 'SetStatusMessage',
        message: value,
      } as ToxRequest;
      client.sendToxRequset(request);
    },
    GetStatusMessage(context, value) {
      // "request": "GetStatusMessage"
      const request = { request: 'GetStatusMessage' } as ToxRequest;
      client.sendToxRequset(request);
    },
    SetStatus(context, value) {
      // "request": "SetStatus"
      // "status": UserStatus
      const request = {
        request: 'SetStatus',
        status: value,
      } as ToxRequest;
      client.sendToxRequset(request);
    },
    GetStatus(context, value) {
      // "request": "GetStatus"
      const request = { request: 'GetStatus' } as ToxRequest;
      client.sendToxRequset(request);
    },
    ControlFile(context, value) {
      // "request": "ControlFile"
      // "friend": number
      // "file_number": number
      // "control": FileControl
      const request = {
        request: 'ControlFile',
        friend: value.friend,
        file_number: value.file_number,
        control: 'Resume',
      };
      client.sendToxRequset(request as ToxRequest);
    },
    SendFile(context, value) {
      // "request": "SendFile"
      // "friend": number
      // "kind": FileKind
      // "file_size": number
      // "file_name": string
      const request = {
        request: 'SendFile',
        friend: value.friend,
        kind: value.kind,
        file_size: value.size,
        file_name: value.name,
      };
      client.sendToxRequset(request as ToxRequest);
    },
    SendAvatar(context, value) {
      // "request": "SendAvatar"
      // "friend": number
      // "file_size": number
      // "file_hash": string
      const request = {
        request: 'SendAvatar',
        friend: value.friend,
        file_size: value.file_size,
        file_hash: value.file_hash,
      };
      client.sendToxRequset(request as ToxRequest);
    },
    SendFileChunk(context, value) {
      // "request": "SendFileChunk"
      // "friend": number
      // "file_number": number
      // "position": number
      // "data": string
      const request = {
        request: 'SendFileChunk',
        friend: value.friend,
        file_number: value.file_number,
        position: value.position,
        data: value.data,
      };
      client.sendToxRequset(request as ToxRequest);
    },
  },
};
