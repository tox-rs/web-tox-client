// Import stylesheets
import Dexie from 'dexie';
import { db } from './appdb';

export class IndexedDB {
  public async setStore(val: string) {
    await db.transaction('rw', db.store, async function() {
      const store = await db.store.get(1);
      if (store) {
        await db.store.update(1, { value: val });
      } else {
        await db.store.add({ id: 1, value: val });
      }
    });
  }

  public async getStore() {
    return await db.store.get(1);
  }
}
