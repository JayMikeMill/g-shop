// backend/src/adapters/db/firebase-db-adapter.ts
import { User } from "@models/user";
import { Product } from "@models/product";
import { Order } from "@models/order";
import { DBAdapter } from "@adapters/db/db-adapter";
import { db } from "@config/firebase/firebase-admin";
import { QueryOptions } from "@models/query-options";

export class FirebaseDBAdapter implements DBAdapter {
  // ---------- USERS ----------
  async createUser(user: User): Promise<User> {
    await db.collection("users").doc(user.id).set(user);
    return user;
  }

  async getUser(id: string): Promise<User | null> {
    const docSnap = await db.collection("users").doc(id).get();
    return docSnap.exists
      ? ({ ...docSnap.data(), id: docSnap.id } as User)
      : null;
  }

  async getUsers(query?: QueryOptions): Promise<User[]> {
    const { limit, page, sortBy, sortOrder } = query || {};
    let dbQuery: FirebaseFirestore.Query = db.collection("users");
    if (sortBy) {
      dbQuery = dbQuery.orderBy(sortBy, sortOrder || "asc");
    }
    if (page !== undefined && limit) {
      // Skip to the correct page using offset
      dbQuery = dbQuery.offset(page * limit);
    }
    if (limit) {
      dbQuery = dbQuery.limit(limit);
    }
    const snapshot = await dbQuery.get();
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as User);
  }

  async updateUser(id: string, update: Partial<User>): Promise<User | null> {
    const user = await this.getUser(id);
    if (!user) return null;
    const updated = { ...user, ...update };
    await db.collection("users").doc(id).set(updated); // overwrite
    return updated;
  }

  async deleteUser(id: string): Promise<void> {
    await db.collection("users").doc(id).delete();
  }

  // ---------- PRODUCTS ----------
  async createProduct(product: Product): Promise<Product> {
    const docRef = await db.collection("products").add(product);
    const created = { ...product, id: docRef.id };
    console.log("Product created:", created);
    return created;
  }

  async getProduct(id: number | string): Promise<Product | null> {
    const docSnap = await db
      .collection("products")
      .doc(id as string)
      .get();
    return docSnap.exists
      ? ({ ...docSnap.data(), id: docSnap.id } as Product)
      : null;
  }

  async getProducts(query?: QueryOptions): Promise<Product[]> {
    console.log("Fetching products with options:", query);
    const { limit, page, sortBy, sortOrder } = query || {};
    let dbQuery: FirebaseFirestore.Query = db.collection("products");
    if (sortBy) {
      dbQuery = dbQuery.orderBy(sortBy, sortOrder || "asc");
    }
    if (page !== undefined && limit) {
      dbQuery = dbQuery.offset(page * limit);
    }
    if (limit) {
      dbQuery = dbQuery.limit(limit);
    }

    const snapshot = await dbQuery.get();

    console.log(
      "Fetched products:",
      snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Product)
    );
    return snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id }) as Product
    );
  }

  async updateProduct(
    id: number | string,
    update: Partial<Product>
  ): Promise<Product | null> {
    const product = await this.getProduct(id);
    if (!product) return null;
    const updated = { ...product, ...update };
    await db
      .collection("products")
      .doc(id as string)
      .set(updated);
    return updated;
  }

  async deleteProduct(id: number | string): Promise<void> {
    await db
      .collection("products")
      .doc(id as string)
      .delete();
  }

  // ---------- ORDERS ----------
  async createOrder(order: Order): Promise<Order> {
    await db.collection("orders").doc(order.id).set(order);
    return order;
  }

  async getOrder(id: string): Promise<Order | null> {
    const docSnap = await db.collection("orders").doc(id).get();
    return docSnap.exists
      ? ({ ...docSnap.data(), id: docSnap.id } as Order)
      : null;
  }

  async getOrders(query?: QueryOptions): Promise<Order[]> {
    const { limit, page, sortBy, sortOrder } = query || {};
    let dbQuery: FirebaseFirestore.Query = db.collection("orders");
    if (sortBy) {
      dbQuery = dbQuery.orderBy(sortBy, sortOrder || "asc");
    }
    if (page !== undefined && limit) {
      dbQuery = dbQuery.offset(page * limit);
    }
    if (limit) {
      dbQuery = dbQuery.limit(limit);
    }
    const snapshot = await dbQuery.get();
    return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as Order);
  }

  async updateOrder(id: string, update: Partial<Order>): Promise<Order | null> {
    const order = await this.getOrder(id);
    if (!order) return null;
    const updated = { ...order, ...update };
    await db.collection("orders").doc(id).set(updated);
    return updated;
  }

  async deleteOrder(id: string): Promise<void> {
    await db.collection("orders").doc(id).delete();
  }
}
