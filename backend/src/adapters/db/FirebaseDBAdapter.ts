// backend/src/adapters/db/firebase-db-adapter.ts
import { User } from "@shared/types/User";
import {
  Product,
  ProductOptionPreset,
  ProductTagPreset,
} from "@shared/types/Product";
import { Category, Collection } from "@shared/types/Catalog";
import { Order } from "@shared/types/Order";
import { DBAdapter } from "@adapters/db/DBAdapter";
import { db } from "@config/firebase/firebaseAdmin";
import { QueryObject } from "@shared/types/QueryObject";

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

  async getUsers(query?: QueryObject): Promise<User[]> {
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

  async getProduct(id: string): Promise<Product | null> {
    const docSnap = await db
      .collection("products")
      .doc(id as string)
      .get();
    return docSnap.exists
      ? ({ ...docSnap.data(), id: docSnap.id } as Product)
      : null;
  }

  async getProducts(
    query?: QueryObject
  ): Promise<{ data: Product[]; total: number }> {
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
    return {
      data: snapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id }) as Product
      ),
      total: snapshot.size,
    };
  }

  async updateProduct(
    id: string,
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

  async deleteProduct(id: string): Promise<void> {
    await db
      .collection("products")
      .doc(id as string)
      .delete();
  }

  // ---------- PRODUCT OPTIONS PRESETS ----------
  async createProductOptionsPreset(
    preset: ProductOptionPreset
  ): Promise<ProductOptionPreset> {
    const docRef = await db.collection("product_options_presets").add(preset);
    const created = { ...preset, id: docRef.id };
    console.log("Product options preset created:", created);
    return created;
  }

  async getProductOptionsPresets(): Promise<ProductOptionPreset[]> {
    const snapshot = await db.collection("product_options_presets").get();
    return snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id }) as ProductOptionPreset
    );
  }

  async deleteProductOptionsPreset(id: string): Promise<void> {
    await db
      .collection("product_options_presets")
      .doc(id as string)
      .delete();
  }

  // ---------- CATEGORIES ----------
  async createCategory(category: Category): Promise<Category> {
    await db.collection("categories").doc(category.id).set(category);
    return category;
  }

  async getCategory(id: string): Promise<Category | null> {
    const docSnap = await db.collection("categories").doc(id).get();
    return docSnap.exists
      ? ({ ...docSnap.data(), id: docSnap.id } as Category)
      : null;
  }

  async getCategories(): Promise<Category[]> {
    const snapshot = await db.collection("categories").get();
    return snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id }) as Category
    );
  }

  async updateCategory(
    id: string,
    update: Partial<Category>
  ): Promise<Category | null> {
    const category = await this.getCategory(id);
    if (!category) return null;
    const updated = { ...category, ...update };
    await db.collection("categories").doc(id).set(updated);
    return updated;
  }

  async deleteCategory(id: string): Promise<void> {
    await db.collection("categories").doc(id).delete();
  }

  // ---------- COLLECTIONS ----------
  async createCollection(collection: Collection): Promise<Collection> {
    await db.collection("collections").doc(collection.id).set(collection);
    return collection;
  }

  async getCollection(id: string): Promise<Collection | null> {
    const docSnap = await db.collection("collections").doc(id).get();
    return docSnap.exists
      ? ({ ...docSnap.data(), id: docSnap.id } as Collection)
      : null;
  }

  async getCollections(): Promise<Collection[]> {
    const snapshot = await db.collection("collections").get();
    return snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id }) as Collection
    );
  }

  async updateCollection(
    id: string,
    update: Partial<Collection>
  ): Promise<Collection | null> {
    const collection = await this.getCollection(id);
    if (!collection) return null;
    const updated = { ...collection, ...update };
    await db.collection("collections").doc(id).set(updated);
    return updated;
  }

  async deleteCollection(id: string): Promise<void> {
    await db.collection("collections").doc(id).delete();
  }

  // ---------- TAGS ----------
  async createProductTagPreset(
    tag: ProductTagPreset
  ): Promise<ProductTagPreset> {
    if (!tag.id) {
      throw new Error("ProductTagPreset must have a defined 'id' property.");
    }
    await db.collection("tags").doc(tag.id).set(tag);
    return tag;
  }

  async getProductTagPreset(id: string): Promise<ProductTagPreset | null> {
    const docSnap = await db.collection("tags").doc(id).get();
    return docSnap.exists
      ? ({ ...docSnap.data(), id: docSnap.id } as ProductTagPreset)
      : null;
  }

  async getProductTagPresets(): Promise<ProductTagPreset[]> {
    const snapshot = await db.collection("tags").get();
    return snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id }) as ProductTagPreset
    );
  }

  async updateProductTagPreset(
    id: string,
    update: Partial<ProductTagPreset>
  ): Promise<ProductTagPreset | null> {
    const tag = await this.getProductTagPreset(id);
    if (!tag) return null;
    const updated = { ...tag, ...update };
    await db.collection("tags").doc(id).set(updated);
    return updated;
  }

  async deleteProductTagPreset(id: string): Promise<void> {
    await db.collection("tags").doc(id).delete();
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

  async getOrders(query?: QueryObject): Promise<Order[]> {
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
