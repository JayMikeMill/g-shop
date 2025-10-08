// backend/src/crud/FirebaseCRUD.ts
import { db } from "@config/firebase/firebaseAdmin";
import type { CrudInterface } from "@shared/types";

export class FirebaseCrudAdapter<T extends { id?: string }>
  implements CrudInterface<T>
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

  // -------------------- GET OVERLOADS --------------------
  async get(id: string): Promise<T | null>;
  async get(
    query: Partial<T>,
    options?: { multiple?: false }
  ): Promise<T | null>;
  async get(
    query: Partial<T>,
    options: { multiple: true }
  ): Promise<{ data: T[]; total: number }>;
  async get(): Promise<{ data: T[]; total: number }>;

  // -------------------- IMPLEMENTATION --------------------
  async get(
    idOrQuery?: string | Partial<T>,
    options?: { multiple?: boolean }
  ): Promise<T | { data: T[]; total: number } | null> {
    const collectionRef = db.collection(this.collection);

    // 1️⃣ By ID
    if (typeof idOrQuery === "string") {
      const doc = await collectionRef.doc(idOrQuery).get();
      return doc.exists ? ({ ...doc.data(), id: doc.id } as T) : null;
    }

    // 2️⃣ Partial query
    if (idOrQuery && typeof idOrQuery === "object") {
      const keys = Object.keys(idOrQuery) as (keyof T)[];
      let queryRef: FirebaseFirestore.Query<FirebaseFirestore.DocumentData> =
        collectionRef;

      keys.forEach((key) => {
        queryRef = queryRef.where(String(key), "==", idOrQuery[key]);
      });

      const snapshot = await queryRef.get();
      const data = snapshot.docs.map((d) => ({ ...d.data(), id: d.id }) as T);

      if (options?.multiple) {
        return { data, total: data.length };
      } else {
        return data[0] ?? null;
      }
    }

    // 3️⃣ Get all
    const snapshot = await collectionRef.get();
    const allData = snapshot.docs.map((d) => ({ ...d.data(), id: d.id }) as T);
    return { data: allData, total: snapshot.size };
  }

  async update(updates: Partial<T> & { id?: string }): Promise<T> {
    if (!updates.id) throw new Error("Document id is required for update");
    const docRef = db.collection(this.collection).doc(updates.id);
    const doc = await docRef.get();
    if (!doc.exists)
      throw new Error(`Document with id ${updates.id} does not exist`);
    await docRef.update(updates);
    return { ...(doc.data() as T), ...updates, id: updates.id };
  }

  async delete(id: string): Promise<T> {
    const docRef = db.collection(this.collection).doc(id);
    const doc = await docRef.get();
    if (!doc.exists) throw new Error(`Document with id ${id} does not exist`);
    await docRef.delete();
    return { ...doc.data(), id } as T;
  }
}
