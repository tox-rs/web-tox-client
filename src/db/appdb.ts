import Dexie from 'dexie';

export class AppDatabase extends Dexie {
  public store: Dexie.Table<{id?: number, value: string}, number>;

  constructor() {
    super('WebTox');

    const DB = this;

    DB.version(1).stores({
      store: '++id, value',
    });
  }
}

export const db = new AppDatabase();
