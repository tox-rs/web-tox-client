import Vue from 'vue';
import Vuex from 'vuex';
import { Responses, ToxResponse, ToxRequest } from 'ws-tox-protocol';
import { Client } from '@/toxProtocol/client';
import { IndexedDB } from '@/db/index';
import { __values } from 'tslib';

Vue.use(Vuex);
const client = new Client();
const db = new IndexedDB();
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
    rooms,
    friendRooms: [...nums],
    conferenceRooms: [...nums],
    numMsg: [...objs],
    notifications,
    info,
    selectedTab: 'tab-person',
    selectedRoom: 1,
    dialogActive: false,
    dialogType: 'prompt',
    selectedContact: null,
    searchActive: false,
    addMemberActive: false,
  },
  mutations: {
    INIT_STATE(state, value) {
      state.rooms = value.rooms;
      state.friendRooms = value.friendRooms;
      state.info = value.info;
      state.conferenceRooms = value.conferenceRooms;
    },
    INIT_USER(state, value) {
      state.info = value;
    },
    ADD_ROOM(state, value) {
      if (state.rooms.length === 0) {
        state.rooms.push({} as Room);
      }
      if (value.type === 'friend') {
        state.friendRooms[value.friend] = state.rooms.length;
      }
      if (value.type === 'conference') {
        state.conferenceRooms[value.conference] = state.rooms.length;
      }
      state.rooms.push({
        id: state.rooms.length,
        name: value.name,
        msgs: value.msgs,
        type: value.type,
        friend: value.friend,
        peers: value.peers,
        conference: value.conference,
        typing: null,
      });
    },
    UPDATE_ROOM(state, value) {
      const newRooms = [...state.rooms];
      const index =
        value.friend !== undefined
          ? state.friendRooms[value.friend]
          : state.conferenceRooms[value.conference];
      const room = newRooms[index] as any;
      Object.keys(value).forEach((key) => {
        if (value[key] !== undefined && key !== 'msgs') {
          room[key] = value[key];
        }
        if (key === 'msgs' && value.msgs) {
          if (value.msgs.length > 0) {
            room[key] = value[key];
          }
        }
      });
      newRooms[index] = room;
      state.rooms = newRooms;
    },
    ADD_MEMBER(state, value) {
      const newRooms = [...state.rooms];
      const index = state.conferenceRooms[value.conference];
      const room = newRooms[index];
      if (room.peers) {
        room.peers[value.peer] = {
          name: value.name,
          isOwn: false,
          num: value.peer,
        };
      }
      newRooms[index] = room;
      console.log(newRooms[index]);
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
    ADD_NOTIFICATION(state, value) {
      state.notifications.push({
        id: state.notifications.length,
        value: value.value,
        num: value.num,
        type: value.type,
        readed: false,
      });
    },
    READ_NOTIFICATION(state, value) {
      const newNotifications = [...state.notifications];
      newNotifications.forEach((notification) => {
        if (value === notification.id) {
          notification.readed = true;
        }
      });
      state.notifications = newNotifications;
    },
    DELETE_NOTIFICATION(state, value) {
      const newNotifications = [...state.notifications];
      newNotifications.splice(value, 1);
      state.notifications = newNotifications;
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
    SEARCH_TRIGGER(state) {
      state.searchActive = !state.searchActive;
    },
    ADD_MEMBER_TRIGGER(state) {
      state.addMemberActive = !state.addMemberActive;
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

      // const request = {
      //   request: 'GetChatList',
      // } as ToxRequest;
      // client.tox.sendRequest(request).then((res) => console.log(res));
    },
    addFriend(context, value) {
      const response = client.tox.addFriend(value, 'Hello');
      if (response !== null) {
        response.then((res) => console.log(res));
      }
    },
    addMember(context, value) {
      if (typeof value === 'number') {
        const request = {
          request: 'InviteToConference',
          friend: value,
          conference:
            context.state.rooms[context.state.selectedRoom].conference,
        } as ToxRequest;
        client.tox.sendRequest(request).then((res) => console.log(res));
      } else {
        context.commit('ADD_MEMBER', value);
      }
    },
    addConference(context) {
      let request = {
        request: 'NewConference',
      } as ToxRequest;
      client.tox.sendRequest(request).then((resConference: ToxResponse) => {
        resConference = resConference as Responses.Conference;
        const room = {
          id: context.state.rooms.length,
          name: 'Group ' + resConference.conference,
          msgs: [],
          type: 'conference',
          conference: resConference.conference,
        } as Room;
        request = {
          request: 'SetConferenceTitle',
          conference: resConference.conference,
          title: room.name,
        };
        client.tox
          .sendRequest(request)
          .then((resConferenceTitle: ToxResponse) => {
            if (resConferenceTitle.response === 'Ok') {
              room.peers = [
                { name: context.state.info.name, isOwn: true, num: 0 },
              ];
              context.dispatch('addRoom', room);
            }
          });
      });
    },
    joinConference(context, value) {
      const request = {
        request: 'JoinConference',
        friend: value.num,
        cookie: value.value,
      } as ToxRequest;
      client.tox.sendRequest(request).then((res: ToxResponse) => {
        res = res as Responses.Conference;
        const room = {
          id: context.state.rooms.length,
          name: 'Group ' + res.conference,
          msgs: [],
          type: 'conference',
          conference: res.conference,
          peers: [],
        } as Room;
        context.dispatch('addRoom', room);
      });
    },
    addRoom(context, value) {
      if (
        (context.state.friendRooms[value.friend] === undefined &&
          value.type === 'friend') ||
        (context.state.conferenceRooms[value.conference] === undefined &&
          value.type === 'conference')
      ) {
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
      } else if (room.conference !== undefined) {
        request = {
          request: 'SendConferenceMessage',
          conference: room.conference,
          kind: 'Normal',
          message: value.msg,
        };
      }
      client.tox.sendRequest(request).then((res: ToxResponse) => {
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
      const index =
        value.friend !== undefined
          ? context.state.friendRooms[value.friend]
          : context.state.conferenceRooms[value.conference];
      const room = context.state.rooms[index];
      const data = {
        room: index,
        msg: value.message,
        author: '',
        status: 'readed',
      };
      if (value.friend !== undefined) {
        data.author = context.state.info.friends[value.friend].name;
      } else {
        if (room.peers) {
          data.author = room.peers[value.peer].name;
        }
      }

      context.commit('SAVE_MSG', data);
      db.updateRoom(context.state.rooms[data.room]);
      if (data.room !== context.state.selectedRoom) {
        context.dispatch('showNotification', data.author + ': ' + data.msg);
      }
    },
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
