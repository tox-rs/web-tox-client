import { Module } from 'vuex';
import { client } from '@/store';
import { ToxRequest } from 'ws-tox-protocol';
export const user: Module<any, any> = {
  namespaced: true,
  actions: {
    test(context, value) {
      console.log('userRequestsActions');
      console.log(context.rootState);
    },
    Info(context, value) {
      // "request": "Info",
      const request = { request: 'Info' } as ToxRequest;
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
      context.dispatch('requests/user/Info', {}, { root: true });
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
  },
};
