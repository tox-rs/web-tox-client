import Dexie from 'dexie';
import { Responses } from 'ws-tox-protocol';
interface Room {
  id: number;
  name: string;
  type: string;
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
export class AppDatabase extends Dexie {
  public rooms: Dexie.Table<Room, number>;
  public friendRooms: Dexie.Table<{ friend: number; room: number }, number>;
  public info: Dexie.Table<Responses.Info, number>;
  constructor() {
    super('WebTox');

    const DB = this;

    DB.version(1).stores({
      rooms: '++id, name, type, friend, peers, msgs',
      friendRooms: 'friend, room',
      info: 'id',
    });
  }
}

export const db = new AppDatabase();
