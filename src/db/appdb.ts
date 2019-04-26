import Dexie from 'dexie';

export class AppDatabase extends Dexie {
  store: Dexie.Table<{id?:number, value:string}, number>;

  constructor() {
    super('WebTox');

    var db = this;

    db.version(1).stores({
      store: '++id, value',
    });
  }
}

export const db = new AppDatabase();
