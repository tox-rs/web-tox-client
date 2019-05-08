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
    await db.transaction('rw', db.rooms, db.friendRooms, async () => {
      const roomId = await db.rooms.add(val);
      await db.friendRooms.add({ friend: val.friend, room: roomId });
    });
    return true;
  }

  public async updateRoom(val: any) {
    if (!this.readed) {
      return false;
    }
    await db.transaction('rw', db.rooms, async () => {
      const room = await db.rooms.where({ friend: val.friend }).first();
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

  public async getData() {
    const rooms = await db.rooms.toCollection().toArray();
    const friendRooms = await db.friendRooms.toCollection().toArray();
    const infoUser = await db.info.toCollection().first();
    const friendRoomsArr: any = [];
    const roomsArr: any = [];
    friendRooms.forEach((friendRoom) => {
      friendRoomsArr[friendRoom.friend] = friendRoom.room;
    });
    rooms.forEach((room) => {
      roomsArr[room.id] = room;
    });
    console.log(infoUser);
    return {
      rooms: roomsArr,
      friendRooms: friendRoomsArr,
      info: infoUser,
    };
  }
}
