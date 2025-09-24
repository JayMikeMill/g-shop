// backend/src/crud/FirebaseCRUD.ts
import { db } from "@config/firebase/firebaseAdmin";
import type { CRUDAdapter } from "./CRUDAdapter";

export class FirebaseCRUDAdapter<T extends { id?: string }>
  implements CRUDAdapter<T>
{
  private collection: string;

  constructor(collection: string) {
    this.collection = collection;
  }

  async create(data: T): Promise<T> {
    const docRef = data.id
      ? db.collection(this.collection).doc(data.id)
      : db.collection(this.collection).doc();
    await docRef.set(data);
    return { ...data, id: docRef.id };
  }

  async get(id: string): Promise<T | null> {
    const doc = await db.collection(this.collection).doc(id).get();
    return doc.exists ? ({ ...doc.data(), id: doc.id } as T) : null;
  }

  async getAll(): Promise<{ data: T[]; total: number }> {
    const snapshot = await db.collection(this.collection).get();
    return {
      data: snapshot.docs.map((d) => ({ ...d.data(), id: d.id }) as T),
      total: snapshot.size,
    };
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    const docRef = db.collection(this.collection).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error(`Document with id ${id} does not exist`);
    }
    await docRef.update(updates);
    return { ...(doc.data() as T), ...updates, id };
  }

  async delete(id: string): Promise<T> {
    const docRef = db.collection(this.collection).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      throw new Error(`Document with id ${id} does not exist`);
    }
    await docRef.delete();
    return { ...doc.data(), id } as T;
  }
}
