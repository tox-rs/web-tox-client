import { MutationTree } from 'vuex';
import { __values } from 'tslib';
export const mutations: MutationTree<any> = {
  INIT_STATE(state, value) {
    state.rooms = value.rooms;
    state.friendRooms = value.friendRooms;
    state.info = value.info;
    state.conferenceRooms = value.conferenceRooms;
  },
  ERROR_MSG(state, value) {
    state.err = value;
  },
  SET_AVATAR(state, value) {
    state.info.avatar = value;
  },
  WRITE_AVATAR(state, value) {
    const avatarStorage = [...state.avatarStorage];
    if (avatarStorage[value.friend] && value.data !== '') {
      if (!avatarStorage[value.friend].match(/#/)) {
        avatarStorage[value.friend] = '';
      }
      avatarStorage[value.friend] = avatarStorage[value.friend].replace(
        '#',
        '',
      );
      avatarStorage[value.friend] =
        avatarStorage[value.friend] + value.data + '#';
    } else if (avatarStorage[value.friend] && value.data === '') {
      avatarStorage[value.friend] = avatarStorage[value.friend].replace(
        '#',
        '',
      );
    } else if (!avatarStorage[value.friend] && value.data !== '') {
      avatarStorage[value.friend] = value.data + '#';
    }
    state.avatarStorage = avatarStorage;
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
  ADD_CONFERENCE_ROOM(state, value) {
    if (state.rooms.length === 0) {
      state.rooms.push({});
    }
    state.conferenceRooms[value.conference] = state.rooms.length;
    state.rooms.push({
      id: state.rooms.length,
      name: value.name,
      msgs: [],
      type: 'conference',
      peers: [],
      friend: value.conference,
      typing: null,
    });
  },
  UPDATE_FRIEND_ROOM(state, value) {
    const newRooms = [...state.rooms];
    const index = state.friendRooms[value.friend];
    newRooms[index].name = value.name;
    state.rooms = newRooms;
  },
  UPDATE_CONFERENCE_ROOM(state, value) {
    const newRooms = [...state.rooms];
    const index = state.conferenceRooms[value.conference];
    newRooms[index].name = value.name;
    newRooms[index].peers = value.peers;
    state.rooms = newRooms;
  },
  UPDATE_ROOM_LIST(state, value) {
    const newRooms: any = [];
    const friendRooms: any = [];
    const conferenceRooms: any = [];
    newRooms.push({});
    state.info.friends.forEach((element: any, index: any) => {
      let msgsArr = [];
      let roomName = 'New room';
      if (state.rooms[state.friendRooms[element.number]]) {
        msgsArr = state.rooms[state.friendRooms[element.number]].msgs;
      }
      if (element.name) {
        roomName = element.name;
      } else if (state.rooms[state.friendRooms[element.number]]) {
        roomName = state.rooms[state.friendRooms[element.number]].name;
      }
      if (element) {
        friendRooms[element.number] = newRooms.length;
        newRooms.push({
          id: newRooms.length,
          name: roomName,
          msgs: msgsArr,
          type: 'friend',
          friend: index,
          typing: null,
        });
      }
    });
    state.rooms.forEach((room: any) => {
      if (room) {
        if (room.type === 'conference' && room.conference !== value) {
          conferenceRooms[room.conference] = newRooms.length;
          newRooms.push({
            id: newRooms.length,
            name: room.name,
            msgs: room.msgs,
            type: 'conference',
            conference: room.conference,
            peers: room.peers,
            typing: null,
          });
        }
      }
    });
    state.conferenceRooms = conferenceRooms;
    state.friendRooms = friendRooms;
    state.rooms = newRooms;
  },
  DELETE_CONFERENCE_ROOM(state, value) {
    const newRooms: any = [];
    const conferenceRooms: any = [];
    state.rooms.splice(state.conferenceRooms[value], 1);
    newRooms.push({});
    state.rooms.forEach((element: any) => {
      if (element) {
        conferenceRooms[value] = newRooms.length;
        newRooms.push(element);
      }
    });
    state.conferenceRooms = conferenceRooms;
    state.rooms = newRooms;
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
  SELECT_ROOM(state, value) {
    state.selectedRoom = value;
  },
  SELECT_TAB(state, value) {
    state.selectedTab = value;
  },
  SELECT_CONTACT(state, value) {
    state.selectedContact = value;
  },
  DIALOG_TRIGGER(state, value) {
    if (value !== 'QR') {
      state.dialogActive = !state.dialogActive;
    }
    state.dialogType = value;
  },
  SEARCH_TRIGGER(state) {
    state.searchActive = !state.searchActive;
  },
  ADD_MEMBER_TRIGGER(state) {
    state.addMemberActive = !state.addMemberActive;
  },
  TOX_AREA_TRIGGER(state) {
    state.toxAreaActive = !state.toxAreaActive;
  },
  MAIN_SIDEBAR_TRIGGER(state) {
    state.mainSidebarActive = !state.mainSidebarActive;
  },
  SUB_SIDEBAR_TRIGGER(state) {
    state.subSidebarActive = !state.subSidebarActive;
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
      author: value.friend,
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
      author: value.peer,
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
      peer = { name: value.name, isOwn: false, number: value.peer };
    }
    rooms[state.conferenceRooms[value.conference]].peers[value.peer] = peer;
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
      author: 'you',
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
    const info = { ...state.info };
    if (info.friends && value.friends) {
      if (info.friends.length > value.friends.length) {
        const arr: any = [];
        value.friends.forEach((friend: any) => {
          info.friends.forEach((infoFriend: any) => {
            if (friend.public_key === infoFriend.public_key) {
              infoFriend.number = friend.number;
              arr.push(infoFriend);
            }
          });
        });
        info.friends = arr;
      } else if (info.friends.length <= value.friends.length) {
        const arr: any = [];
        value.friends.forEach((friend: any, key: any) => {
          arr.push(friend);
          info.friends.forEach((infoFriend: any) => {
            if (friend.public_key === infoFriend.public_key) {
              arr[key].name = infoFriend.name;
              arr[key].connection = infoFriend.connection;
              arr[key].number = friend.number;
            }
          });
        });
        info.friends = arr;
      }
    } else if (!info.friends && value.friends) {
      info.friends = value.friends;
    } else {
      info.friends = [];
    }
    Object.keys(value).map((key) => {
      if (key !== 'friends') {
        info[key] = value[key];
      }
    });
    state.info = info;
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
      peers: [{ name: state.info.name, isOwn: true, number: 0 }],
      conference: value.conference,
    });
  },
  responseConferencePeerList(state, value) {
    const rooms = [...state.rooms];
    const room = state.rooms[state.conferenceRooms[value.req.conference]];
    if (room.peers) {
      if (room.peers.length > value.res.peers.length) {
        const arr: any = [];
        value.res.peers.forEach((peer: any, key: any) => {
          room.peers.forEach((roomPeer: any, index: any) => {
            if (peer.public_key === roomPeer.public_key) {
              arr.push(roomPeer);
            }
          });
        });
        room.peers = arr;
      } else {
        value.res.peers.forEach((peer: any, key: any) => {
          if (!room.peers[key]) {
            room.peers[key] = {
              name: '',
              number: peer.number,
              public_key: peer.public_key,
            };
          } else {
            room.peers[key].number = peer.number;
            room.peers[key].public_key = peer.public_key;
          }
        });
      }
    } else {
      value.res.peers.forEach((peer: any, key: any) => {
        if (!room.peers[key]) {
          room.peers[key] = {
            name: '',
            number: peer.number,
            public_key: peer.public_key,
          };
        } else {
          room.peers[key].number = peer.number;
          room.peers[key].public_key = peer.public_key;
        }
      });
    }
    state.rooms[state.conferenceRooms[value.req.conference]] = room;
    state.rooms = rooms;
  },
};
