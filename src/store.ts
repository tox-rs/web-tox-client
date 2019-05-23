import Vue from 'vue';
import Vuex from 'vuex';
import { Responses, ToxResponse, ToxRequest } from 'ws-tox-protocol';
import { Client } from '@/toxProtocol/client';
import { IndexedDB } from '@/db/index';
import { events } from '@/modules/events';
import { responses } from '@/modules/responses';
import { requests } from '@/modules/requests';
import { mutations } from '@/modules/mutations';

Vue.use(Vuex);
export const client = new Client();
export const db = new IndexedDB();
interface Room {
  id: number;
  name: string;
  type: string;
  conference?: number;
  typing?: number | null;
  friend?: number;
  peers?: object[];
  msgs: Msg[];
}
interface Msg {
  value: string;
  author: string;
  date: Date;
  status: string;
  message_id?: number;
}
interface Notification {
  id: number;
  value: string;
  msg?: string;
  num: number;
  type: string;
  readed: boolean;
}
const info = {} as Responses.Info;
const rooms: Room[] = [];
const nums: number[] = [];
const objs: object[] = [];
const notifications: Notification[] = [];

export default new Vuex.Store({
  state: {
    connection: 'None',
    rooms,
    friendRooms: [...nums],
    conferenceRooms: [...nums],
    numMsg: [...nums],
    notifications,
    info: { connection: 'None', nospam: '', address: '', public_key: '', info },
    selectedTab: 'tab-person',
    selectedRoom: 1,
    dialogActive: false,
    dialogType: 'prompt',
    selectedContact: null,
    searchActive: false,
    addMemberActive: false,
    toxAreaActive: true,
    mainSidebarActive: true,
    subSidebarActive: true,
  },
  modules: {
    events,
    responses,
    requests,
  },
  mutations,
  actions: {
    addNotification(context, value) {
      context.commit('ADD_NOTIFICATION', value);
    },
    selectTab(context, value) {
      context.commit('SELECT_TAB', value);
      if (context.state.addMemberActive) {
        context.commit('ADD_MEMBER_TRIGGER');
      }
    },
    selectRoom(context, value) {
      if (context.state.rooms.length) {
        context.commit('SELECT_ROOM', value);
      }
      if (context.state.addMemberActive) {
        context.commit('ADD_MEMBER_TRIGGER');
      }
    },
    showNotification(context, value) {
      Vue.notification.show(
        'Zerho Chat',
        {
          body: value,
        },
        {
          onclick: function() {
            console.log('Custom click event was called');
          },
        },
      );
    },
    getData(context) {
      context.dispatch('responses/conference/test');
      context.dispatch('responses/friend/test');
      context.dispatch('responses/user/test');
      context.dispatch('requests/conference/test');
      context.dispatch('requests/friend/test');
      context.dispatch('requests/user/test');
      context.dispatch('events/conference/test');
      context.dispatch('events/friend/test');
      context.dispatch('events/user/test');
      db.getData().then((res) => {
        if (res) {
          context.commit('INIT_STATE', res);
          db.readed = true;
        } else {
          db.readed = true;
        }
        context.dispatch('requests/user/Info');
        context.dispatch('requests/conference/GetConferenceList');
      });
    },
  },
});
