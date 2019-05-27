// Import stylesheets
import Dexie from 'dexie';
import { db } from './appdb';
import Room from '@/components/Room/Room';

export class IndexedDB {
  public readed: boolean = false;

  public async updateInfo(val: any) {
    await db.transaction('rw', db.info, async () => {
      const info = await db.info.get(1);
      if (!info) {
        val.id = 1;
        await db.info.add(val);
      } else {
        db.info.update(1, val);
      }
    });
  }

  public async addRoom(val: any) {
    if (val.type === 'conference') {
      return;
    }
    await db.transaction(
      'rw',
      db.rooms,
      db.friendRooms,
      db.conferenceRooms,
      async () => {
        const roomId = await db.rooms.add(val);
        if (val.type === 'friend') {
          await db.friendRooms.add({ friend: val.friend, room: roomId });
        }
        if (val.type === 'conference') {
          await db.conferenceRooms.add({
            conference: val.conference,
            room: roomId,
          });
        }
      },
    );
    return true;
  }

  public async updateRoom(value: any) {
    if (!this.readed) {
      return false;
    }
    if (value.type === 'conference') {
      return;
    }
    const val = { ...value };
    val.typing = null;
    await db.transaction('rw', db.rooms, async () => {
      let room;
      if (val.type === 'friend') {
        room = await db.rooms.where({ friend: val.friend }).first();
      } else {
        room = await db.rooms.where({ conference: val.conference }).first();
      }

      if (room) {
        if (
          val.msgs.length > 0 ||
          (room.msgs.length === 0 && val.msgs.length === 0)
        ) {
          db.rooms.update(room.id, val);
        }
      }
    });
    return true;
  }
  public async deleteRoom(value: any) {
    await db.transaction('rw', db.rooms, db.friendRooms, async () => {
      await db.rooms.where({ friend: value }).delete();
      await db.friendRooms.where({ friend: value }).delete();
    });
  }
  public async getData() {
    const rooms = await db.rooms.toCollection().toArray();
    const friendRooms = await db.friendRooms.toCollection().toArray();
    const conferenceRooms = await db.conferenceRooms.toCollection().toArray();
    const infoUser = await db.info.toCollection().first();
    const friendRoomsArr: any = [];
    const conferenceRoomsArr: any = [];
    const roomsArr: any = [];
    friendRooms.forEach((friendRoom) => {
      friendRoomsArr[friendRoom.friend] = friendRoom.room;
    });
    conferenceRooms.forEach((conferenceRoom) => {
      conferenceRoomsArr[conferenceRoom.conference] = conferenceRoom.room;
    });
    // rooms.forEach((room) => {
    //   roomsArr[room.id] = room;
    // });
    if (infoUser) {
      infoUser.friends.forEach((friend: any) => {
        friend.connection = 'None';
      });
    }
    console.log(infoUser);
    return {
      rooms: rooms,
      friendRooms: friendRoomsArr,
      info: infoUser,
      conferenceRooms: conferenceRoomsArr,
    };
  }
}
