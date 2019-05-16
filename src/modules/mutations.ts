import { MutationTree } from 'vuex';
import { __values } from 'tslib';
export const mutations: MutationTree<any> = {
  INIT_STATE(state, value) {
    state.rooms = value.rooms;
    state.friendRooms = value.friendRooms;
    state.info = value.info;
    state.conferenceRooms = value.conferenceRooms;
  },
  ADD_ROOM(state, value) {
    if (state.rooms.length === 0) {
      state.rooms.push({});
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
  ADD_FRIEND_ROOM(state, value) {
    if (state.rooms.length === 0) {
      state.rooms.push({});
    }
    state.friendRooms[value.friend] = state.rooms.length;
    state.rooms.push({
      id: state.rooms.length,
      name: value.name,
      msgs: [],
      type: 'friend',
      friend: value.friend,
      typing: null,
    });
  },
  UPDATE_FRIEND_ROOM(state, value) {
    const newRooms = [...state.rooms];
    const index = state.friendRooms[value.friend];
    newRooms[index].name = value.name;
    state.rooms = newRooms;
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
  eventConnectionStatus(state, value) {
    state.info.connection = value.status;
  },
  eventFriendRequest(state, value) {
    state.notifications.push({
      id: state.notifications.length,
      value: value.public_key,
      msg: value.message,
      num: null,
      type: 'friend',
      readed: false,
    });
  },
  eventFriendMessage(state, value) {
    state.rooms[state.friendRooms[value.friend]].msgs.push({
      value: value.message,
      author: state.info.friends[value.friend].name,
      date: new Date(Date.now()),
      status: 'readed',
    });
  },
  eventFriendName(state, value) {
    const info = { ...state.info };
    info.friends[value.friend].name = value.name;
    state.info = info;
  },
  eventFriendStatusMessage(state, value) {
    const info = { ...state.info };
    info.friends[value.friend].status_message = value.status;
    state.info = info;
  },
  eventFriendStatus(state, value) {
    const info = { ...state.info };
    info.friends[value.friend].status = value.status;
    state.info = info;
  },
  eventFriendConnectionStatus(state, value) {
    const info = { ...state.info };
    info.friends[value.friend].connection = value.status;
    state.info = info;
  },
  eventFriendTyping(state, value) {
    const rooms = [...state.rooms];
    rooms[state.friendRooms[value.friend]].typing = value.is_typing
      ? value.friend
      : null;
    state.rooms = rooms;
  },
  eventFriendReadReceipt(state, value) {
    const rooms = [...state.rooms];
    rooms[state.friendRooms[value.friend]].msgs[
      state.numMsg[value.message_id]
    ].status = 'readed';
    state.rooms = rooms;
  },
  eventConferenceInvite(state, value) {
    state.notifications.push({
      id: state.notifications.length,
      value: value.cookie,
      num: value.friend,
      type: 'invite',
      readed: false,
    });
  },
  eventConferenceConnected(state, value) {
    state.conferenceRooms[value.conference] = state.rooms.length;
    state.rooms.push({
      id: state.rooms.length,
      name: 'Group ' + value.conference,
      msgs: [],
      type: 'conference',
      peers: [],
      conference: value.conference,
    });
  },
  eventConferenceMessage(state, value) {
    const rooms = [...state.rooms];
    rooms[state.conferenceRooms[value.conference]].msgs.push({
      value: value.message,
      author:
        rooms[state.conferenceRooms[value.conference]].peers[value.peer].name,
      date: new Date(Date.now()),
      status: 'readed',
    });
    state.rooms = rooms;
  },
  eventConferenceTitle(state, value) {
    const rooms = [...state.rooms];
    rooms[state.conferenceRooms[value.conference]].name = value.title;
    state.rooms = rooms;
  },
  eventConferencePeerName(state, value) {
    const rooms = [...state.rooms];
    let peer = rooms[state.conferenceRooms[value.conference]].peers[value.peer];
    if (peer) {
      peer.name = value.name;
    } else {
      peer = { name: value.name, isOwn: false, num: value.peer };
    }
    rooms[state.conferenceRooms[value.conference]].peers[
      value.peer
    ] = peer;
    state.rooms = rooms;
  },
  eventConferencePeerListChanged(state, value) {
    // "event": "ConferencePeerListChanged",
    // "conference": number
  },
  eventFileControlReceipt(state, value) {
    // "event": "FileControlReceipt"
    // "friend": number
    // "file_number": number
    // "control": FileControl
  },
  eventFileChunkRequest(state, value) {
    // "event": "FileChunkRequest"
    // "friend": number
    // "file_number": number
    // "position": number
    // "length": number
  },
  eventFileReceipt(state, value) {
    // "event": "FileReceipt"
    // "friend": number
    // "file_number": number
    // "kind": number
    // "file_size": number
    // "file_name": string
  },
  eventFileChunkReceipt(state, value) {
    // "event": "FileChunkReceipt"
    // "friend": number
    // "file_number": number
    // "position": number
    // "data": string
  },
  responseMessageSent(state, value) {
    state.numMsg[value.res.message_id] =
      state.rooms[state.friendRooms[value.req.friend]].msgs.length;
    state.rooms[state.friendRooms[value.req.friend]].msgs.push({
      value: value.req.message,
      author: state.info.name,
      date: new Date(Date.now()),
      status: 'sended',
    });
  },
  responseInfo(state, value) {
    // "response": "Info",
    // "tox_id": string,
    // "name": string,
    // "status": UserStatus,
    // "status_message": string
    // "friends": FriendInfo[],
    state.info = value;
  },
  responseConnectionStatus(state, value) {
    // "response": "ConnectionStatus"
    // "status": ConnectionStatus
    const info = { ...state.info };
    info.connection = value.status;
    state.info = info;
  },
  responseAddress(state, value) {
    // "response": "Address"
    // "address": string
    const info = { ...state.info };
    info.address = value.address;
    state.info = info;
  },
  responseNospam(state, value) {
    // "response": "Nospam"
    // "nospam": string
    const info = { ...state.info };
    info.nospam = value.nospam;
    state.info = info;
  },
  responsePublicKey(state, value) {
    // "response": "PublicKey"
    // "public_key": string
    const info = { ...state.info };
    info.public_key = value.public_key;
    state.info = info;
  },
  responseName(state, value) {
    // "response": "Name"
    // "name": string
    const info = { ...state.info };
    info.name = value.name;
    state.info = info;
  },
  responseStatusMessage(state, value) {
    // "response": "StatusMessage"
    // "status": string
    const info = { ...state.info };
    info.status_message = value.status;
    state.info = info;
  },
  responseStatus(state, value) {
    // "response": "Status"
    // "status": UserStatus
    const info = { ...state.info };
    info.status = value.status;
    state.info = info;
  },
  responseConference(state, value) {
    state.conferenceRooms[value.conference] = state.rooms.length;
    state.rooms.push({
      id: state.rooms.length,
      name: 'Group ' + value.conference,
      msgs: [],
      type: 'conference',
      peers: [{ name: state.info.name, isOwn: true, num: 0 }],
      conference: value.conference,
    });
  },
};