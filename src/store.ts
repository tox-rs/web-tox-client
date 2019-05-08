import Vue from 'vue';
import Vuex from 'vuex';
import { Responses } from 'ws-tox-protocol';
import { Client } from '@/toxProtocol/client';
import { IndexedDB } from '@/db/index';

Vue.use(Vuex);
const client = new Client();
const db = new IndexedDB();
interface Room {
  id: number;
  name: string;
  type: string;
  typing?: number | null;
  friend?: number;
  peers?: number[];
  msgs: Msg[];
}

interface Msg {
  value: string;
  author: string;
  date: Date;
  status: string;
  message_id?: number;
}

const info = {} as Responses.Info;
const rooms: Room[] = [];
const nums: number[] = [];
const objs: object[] = [];

export default new Vuex.Store({
  state: {
    rooms,
    friendRooms: [...nums],
    conferenceRooms: [...nums],
    numMsg: objs,
    info,
    selectedTab: 'tab-person',
    selectedRoom: 1,
    dialogActive: false,
    dialogType: 'prompt',
    selectedContact: null,
  },
  mutations: {
    INIT_STATE(state, value) {
      state.rooms = value.rooms;
      state.friendRooms = value.friendRooms;
      state.info = value.info;
    },
    INIT_USER(state, value) {
      state.info = value;
    },
    ADD_ROOM(state, value) {
      if (state.rooms.length === 0) {
        state.rooms.push({} as Room);
      }
      state.friendRooms[value.friend] = state.rooms.length;
      state.rooms.push({
        id: state.rooms.length,
        name: value.name,
        msgs: value.msgs,
        type: value.type,
        friend: value.friend,
        peers: value.peers,
        typing: null,
      });
    },
    UPDATE_ROOM(state, value) {
      const newRooms = [...state.rooms];
      if (value.typing !== undefined) {
        newRooms[state.friendRooms[value.friend]].typing = value.typing;
      } else if (value.msgs.length > 0) {
        newRooms[state.friendRooms[value.friend]].msgs = value.msgs;
      } else {
        newRooms[state.friendRooms[value.friend]].name = value.name;
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
        db.updateInfo(value);
        context.state.info.friends.forEach((element: any) => {
          context.dispatch('addRoom', {
            name: element.name || 'New room',
            msgs: [],
            type: 'friend',
            friend: element.number,
          });
        });
      });
    },
    addFriend(context, value) {
      const response = client.tox.addFriend(value, 'Hello');
      if (response !== null) {
        response.then((res) => console.log(res));
      }
    },
    addRoom(context, value) {
      if (context.state.friendRooms[value.friend] === undefined) {
        db.addRoom(value as Room).then((res) => {
          if (res) {
            context.commit('ADD_ROOM', value);
          }
        });
      } else {
        db.updateRoom(value as Room).then((res) => {
          if (res) {
            context.commit('UPDATE_ROOM', value);
          }
        });
      }
    },
    setTyping(context, value) {
      const data = {} as any;
      if (value.is_typing) {
        data.friend = value.friend;
        data.typing = value.friend;
      } else {
        data.friend = value.friend;
        data.typing = null;
      }
      context.commit('UPDATE_ROOM', data);
    },
    sendMsg(context, value) {
      const room = context.state.rooms[context.state.selectedRoom];
      let request: any;
      if (room.friend !== undefined) {
        request = {
          request: 'SendFriendMessage',
          friend: room.friend,
          kind: 'Normal',
          message: value.msg,
        };
      }
      client.tox.sendRequest(request).then((res: any) => {
        if (res.response === 'MessageSent') {
          value.message_id = res.message_id;
          context.commit('SAVE_MSG', value);
          db.updateRoom(room);
        }
      });
    },
    changeStatusMsg(context, value) {
      const data = context.state.numMsg[value] as any;
      data.status = 'readed';
      context.commit('CHANGE_STATUS_MSG', data);
      db.updateRoom(context.state.rooms[data.room]);
    },
    saveMsg(context, value) {
      const data = {
        room: context.state.friendRooms[value.friend],
        msg: value.message,
        author: context.state.info.friends[value.friend].name,
        status: 'readed',
      };
      context.commit('SAVE_MSG', data);
      db.updateRoom(context.state.rooms[data.room]);
      if (data.room !== context.state.selectedRoom) {
        context.dispatch('showNotification', data.author + ': ' + data.msg);
      }
    },
    selectTab(context, value) {
      context.commit('SELECT_TAB', value);
    },
    selectRoom(context, value) {
      if (context.state.rooms.length) {
        context.commit('SELECT_ROOM', value);
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
      db.getData().then((res) => {
        if (res) {
          context.commit('INIT_STATE', res);
          db.readed = true;
        } else {
          db.readed = true;
        }
        context.dispatch('initUser');
        setInterval(() => {
          context.dispatch('initUser');
        }, 5000);
      });
    },
  },
});
