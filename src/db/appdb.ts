import Dexie from 'dexie';

interface Info {
  connection: string;
  nospam: string;
  address: string;
  public_key: string;
  response: 'Info';
  tox_id: string;
  name: string;
  status: string;
  status_message: string;
  friends: object[];
}
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
  public conferenceRooms: Dexie.Table<
    { conference: number; room: number },
    number
  >;
  public info: Dexie.Table<Info, number>;
  constructor() {
    super('WebTox');

    const DB = this;

    DB.version(1).stores({
      rooms: '++id, name, type, friend, conference, msgs',
      friendRooms: 'friend, room',
      conferenceRooms: 'conference, room',
      info: 'id',
    });
  }
}

export const db = new AppDatabase();
