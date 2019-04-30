import Vue from 'vue';
import Vuex from 'vuex';
import { Responses } from 'ws-tox-protocol';
import { Client } from '@/toxProtocol/client';
import { IndexedDB } from '@/db/index';

Vue.use(Vuex);
const client = new Client();
const db = new IndexedDB();
interface Room {
  name: string;
  type: string;
  number: number;
  typing?: number | null;
  msgs: Msg[];
}

interface Msg {
  value: string;
  author: string;
  date: Date;
  status: string;
  message_id?: number;
}

const info: Responses.Info = {} as Responses.Info;
const rooms: Room[] = [];
const nums: number[] = [];
const objs: object[] = [];
let readed = false;
export default new Vuex.Store({
  state: {
    rooms,
    numRooms: nums,
    numMsg: objs,
    info,
    selectedTab: 'tab-person',
    selectedRoom: 0,
    dialogActive: false,
    dialogType: 'prompt',
    selectedContact: null,
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
        typing: null,
      });
    },
    UPDATE_ROOM(state, value) {
      const newRooms = [...state.rooms];
      if (value.name) {
        newRooms[state.numRooms[value.number]].name = value.name;
      }
      if (value.typing !== undefined) {
        newRooms[state.numRooms[value.number]].typing = value.typing;
      }
      state.rooms = newRooms;
    },
    SAVE_MSG(state, value) {
      if (value.message_id) {
        state.numMsg[value.message_id] = {
          room: value.room,
          msg: state.rooms[value.room].msgs.length,
        };
      }
      state.rooms[value.room].msgs.push({
        value: value.msg,
        author: value.author,
        date: new Date(Date.now()),
        status: value.status || 'sended',
      });
    },
    CHANGE_STATUS_MSG(state, value) {
      state.rooms[value.room].msgs[value.msg].status = value.status;
    },
    SELECT_ROOM(state, value) {
      state.selectedRoom = value;
    },
    SELECT_TAB(state, value) {
      state.selectedTab = value;
    },
    SELECT_CONTACT(state, value) {
      state.selectedContact = value;
    },
    DIALOG_TRIGGER(state) {
      state.dialogActive = !state.dialogActive;
    },
  },
  actions: {
    initUser(context) {
      client.getInfo().then((value) => {
        context.commit('INIT_USER', value);
        context.state.info.friends.forEach((element: any) => {
          context.dispatch('addRoom', {
            name: element.name || 'New room',
            number: element.number,
            msgs: [],
            type: 'people',
          });
        });
        context.dispatch('selectRoom', 0);
        context.dispatch('setLocalStorage');
      });
    },
    addFriend(context, value) {
      const response = client.tox.addFriend(value, 'Hello');
      if (response !== null) {
        response.then((res) => console.log(res));
      }
    },
    addRoom(context, value) {
      if (context.state.numRooms[value.number] === undefined) {
        context.commit('ADD_ROOM', value);
        context.dispatch('setLocalStorage');
      } else {
        context.commit('UPDATE_ROOM', value);
        context.dispatch('setLocalStorage');
      }
    },
    setTyping(context, value) {
      const data = {} as Room;
      if (value.is_typing) {
        data.number = value.friend;
        data.typing = value.friend;
      } else {
        data.number = value.friend;
        data.typing = null;
      }
      context.commit('UPDATE_ROOM', data);
    },
    sendMsg(context, value) {
      if (client.chatWith !== null) {
        client.tox
          .sendFriendMessage(client.chatWith, 'Normal', value.msg)
          .then((response) => {
            if (response.response === 'MessageSent') {
              value.message_id = response.message_id;
              context.commit('SAVE_MSG', value);
            }
            context.dispatch('setLocalStorage');
          });
      }
    },
    changeStatusMsg(context, value) {
      const data = context.state.numMsg[value] as any;
      data.status = 'readed';
      context.commit('CHANGE_STATUS_MSG', data);
    },
    saveMsg(context, value) {
      const data = {
        room: context.state.numRooms[value.friend],
        msg: value.message,
        author: context.state.info.friends[value.friend].name,
        status: 'readed',
      };
      context.commit('SAVE_MSG', data);
      context.dispatch('setLocalStorage');
    },
    selectTab(context, value) {
      context.commit('SELECT_TAB', value);
      context.dispatch('setLocalStorage');
    },
    selectRoom(context, value) {
      if (context.state.rooms.length) {
        client.setChatWith(context.state.rooms[value].number);
        context.commit('SELECT_ROOM', value);
        context.dispatch('setLocalStorage');
      }
    },
    setLocalStorage(context) {
      if (readed) {
        db.setStore(JSON.stringify(context.state));
      }
    },
    getLocalStorage(context) {
      db.getStore().then((res) => {
        if (res) {
          context.commit('INIT_STATE', JSON.parse(res.value));
          readed = true;
          client.setChatWith(
            context.state.rooms[context.state.selectedRoom].number,
          );
        } else {
          readed = true;
        }
      });
    },
  },
});
