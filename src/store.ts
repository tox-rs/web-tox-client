import Vue from 'vue';
import Vuex from 'vuex';
import 'ws-tox-protocol';
import { Client } from '@/toxProtocol/client';
import { LZMA } from 'lzma/src/lzma_worker.js';

Vue.use(Vuex);
const client = new Client();
interface Room {
  name: string;
  type: string;
  number: number;
  msgs: Msg[];
}
interface Msg {
  value: string;
  author: string;
  date: Date;
  status: boolean;
}
const info: Info = {};
const rooms: Room[] = [];
const nums: number[] = [];
export default new Vuex.Store({
  state: {
    rooms: rooms,
    numRooms: nums,
    info: info,
    selectedTab: 'tab-person',
    selectedRoom: 0,
  },
  mutations: {
    INIT_STATE(state, value) {
      state.rooms = value.rooms;
      state.numRooms = value.numRooms;
      state.info = value.info;
      state.selectedTab = value.selectedTab;
      state.selectedRoom = value.selectedRoom;
    },
    INIT_USER(state, value) {
      state.info = value;
    },
    ADD_ROOM(state, value) {
      state.numRooms[value.number] = state.rooms.length;
      state.rooms.push({
        name: value.name,
        msgs: value.msgs,
        type: value.type,
        number: value.number,
      });
    },
    SAVE_MSG(state, value) {
      state.rooms[value.room].msgs.push({
        value: value.msg,
        author: value.author,
        date: new Date(Date.now()),
        status: false,
      });
    },
    CHANGE_STATUS_MSG(state, value) {
      state.rooms[value.room].msgs[
        state.rooms[value.room].msgs.length - 1
      ].status = true;
    },
    SELECT_ROOM(state, value) {
      state.selectedRoom = value;
    },
    SELECT_TAB(state, value) {
      state.selectedTab = value;
    },
  },
  actions: {
    initUser(context) {
      // result = LZMA.decompress(result);
      // console.log(result);
      client.getInfo().then((value) => {
        context.commit('INIT_USER', value);
        context.state.info.friends.forEach((element: any) => {
          context.dispatch('addRoom', {
            name: element.name,
            number: element.number,
            msgs: [],
            type: 'people',
          });
        });
      });
      context.dispatch('setLocalStorage');
    },
    addRoom(context, value) {
      if (context.state.numRooms[value.number] === undefined) {
        context.commit('ADD_ROOM', value);
        context.dispatch('setLocalStorage');
      }
    },
    sendMsg(context, value) {
      context.commit('SAVE_MSG', value);
      if (client.chatWith !== null) {
        client.tox
          .sendFriendMessage(client.chatWith, 'Normal', value.msg)
          .then((response) => {
            if (response.response === 'Ok') {
              context.commit('CHANGE_STATUS_MSG', value);
            }
            context.dispatch('setLocalStorage');
          });
      }
    },
    saveMsg(context, value) {
      const data = {
        room: context.state.numRooms[value.friend],
        msg: value.message,
        author: context.state.info.friends[value.friend].name,
      };
      context.commit('SAVE_MSG', data);
      context.commit('CHANGE_STATUS_MSG', data);
      context.dispatch('setLocalStorage');
    },
    selectTab(context, value) {
      context.commit('SELECT_TAB', value);
      context.dispatch('setLocalStorage');
    },
    selectRoom(context, value) {
      client.setChatWith(context.state.rooms[value].number);
      context.commit('SELECT_ROOM', value);
      context.dispatch('setLocalStorage');
    },
    setLocalStorage(context) {
      const result = LZMA.compress(JSON.stringify(context.state));
      localStorage.setItem('store', JSON.stringify(result));
    },
    getLocalStorage(context) {
      if (localStorage.store) {
        const result = LZMA.decompress(JSON.parse(localStorage.store));
        context.commit('INIT_STATE', JSON.parse(result));
        client.setChatWith(context.state.rooms[context.state.selectedRoom].number);
      }
    },
  },
});
