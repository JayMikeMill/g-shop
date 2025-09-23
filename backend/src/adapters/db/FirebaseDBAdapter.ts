// backend/src/adapters/db/firebase-db-adapter.ts
import { User } from "@shared/types/User";
import {
  Product,
  ProductOption,
  ProductOptionsPreset,
  ProductTag,
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
    const doc = await db.collection("users").doc(id).get();
    return doc.exists ? ({ ...doc.data(), id: doc.id } as User) : null;
  }

  async getUsers(
    query?: QueryObject
  ): Promise<{ data: User[]; total: number }> {
    const { limit, page, sortBy, sortOrder } = query || {};
    let q: FirebaseFirestore.Query = db.collection("users");
    if (sortBy) q = q.orderBy(sortBy, sortOrder || "asc");
    if (page !== undefined && limit) q = q.offset(page * limit);
    if (limit) q = q.limit(limit);
    const snapshot = await q.get();
    return {
      data: snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as User),
      total: snapshot.size,
    };
  }

  async updateUser(id: string, update: Partial<User>): Promise<User | null> {
    const user = await this.getUser(id);
    if (!user) return null;
    const updated = { ...user, ...update };
    await db.collection("users").doc(id).set(updated);
    return updated;
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.getUser(id);
    if (!user) throw new Error("User not found");
    await db.collection("users").doc(id).delete();
    return user;
  }

  // ---------- PRODUCTS ----------
  async createProduct(product: Product): Promise<Product> {
    const docRef = await db.collection("products").add(product);
    return { ...product, id: docRef.id };
  }

  async getProduct(id: string): Promise<Product | null> {
    const doc = await db.collection("products").doc(id).get();
    return doc.exists ? ({ ...doc.data(), id: doc.id } as Product) : null;
  }

  async getProducts(
    query?: QueryObject
  ): Promise<{ data: Product[]; total: number }> {
    const { limit, page, sortBy, sortOrder } = query || {};
    let q: FirebaseFirestore.Query = db.collection("products");
    if (sortBy) q = q.orderBy(sortBy, sortOrder || "asc");
    if (page !== undefined && limit) q = q.offset(page * limit);
    if (limit) q = q.limit(limit);
    const snapshot = await q.get();
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
    await db.collection("products").doc(id).set(updated);
    return updated;
  }

  async deleteProduct(id: string): Promise<Product> {
    const product = await this.getProduct(id);
    if (!product) throw new Error("Product not found");
    await db.collection("products").doc(id).delete();
    return product;
  }

  // ---------- PRODUCT OPTIONS PRESETS ----------
  async createProductOptionsPreset(
    preset: ProductOptionsPreset
  ): Promise<ProductOptionsPreset> {
    const docRef = await db.collection("product_options_presets").add(preset);
    return { ...preset, id: docRef.id };
  }

  async getProductOptionsPresets(): Promise<{
    data: ProductOptionsPreset[];
    total: number;
  }> {
    const snapshot = await db.collection("product_options_presets").get();
    return {
      data: snapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id }) as ProductOptionsPreset
      ),
      total: snapshot.size,
    };
  }

  async deleteProductOptionsPreset(id: string): Promise<ProductOptionsPreset> {
    const preset = await db.collection("product_options_presets").doc(id).get();
    if (!preset.exists) throw new Error("Preset not found");
    const data = { ...preset.data(), id: preset.id } as ProductOptionsPreset;
    await db.collection("product_options_presets").doc(id).delete();
    return data;
  }

  // ---------- PRODUCT TAGS ----------
  async createProductTag(tag: ProductTag): Promise<ProductTag> {
    if (!tag.id) {
      throw new Error("Tag id is required");
    }
    await db.collection("tags").doc(tag.id).set(tag);
    return tag;
  }

  async getProductTag(id: string): Promise<ProductTag | null> {
    const doc = await db.collection("tags").doc(id).get();
    return doc.exists ? ({ ...doc.data(), id: doc.id } as ProductTag) : null;
  }

  async getProductTags(
    query?: QueryObject
  ): Promise<{ data: ProductTag[]; total: number }> {
    const snapshot = await db.collection("tags").get();
    return {
      data: snapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id }) as ProductTag
      ),
      total: snapshot.size,
    };
  }

  async updateProductTag(
    id: string,
    update: Partial<ProductTag>
  ): Promise<ProductTag | null> {
    const tag = await this.getProductTag(id);
    if (!tag) return null;
    const updated = { ...tag, ...update };
    await db.collection("tags").doc(id).set(updated);
    return updated;
  }

  async deleteProductTag(id: string): Promise<ProductTag> {
    const tag = await this.getProductTag(id);
    if (!tag) throw new Error("Tag not found");
    await db.collection("tags").doc(id).delete();
    return tag;
  }

  // ---------- CATEGORIES ----------
  async createCategory(category: Category): Promise<Category> {
    await db.collection("categories").doc(category.id).set(category);
    return category;
  }

  async getCategory(id: string): Promise<Category | null> {
    const doc = await db.collection("categories").doc(id).get();
    return doc.exists ? ({ ...doc.data(), id: doc.id } as Category) : null;
  }

  async getCategories(): Promise<{ data: Category[]; total: number }> {
    const snapshot = await db.collection("categories").get();
    return {
      data: snapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id }) as Category
      ),
      total: snapshot.size,
    };
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

  async deleteCategory(id: string): Promise<Category> {
    const category = await this.getCategory(id);
    if (!category) throw new Error("Category not found");
    await db.collection("categories").doc(id).delete();
    return category;
  }

  // ---------- COLLECTIONS ----------
  async createCollection(collection: Collection): Promise<Collection> {
    await db.collection("collections").doc(collection.id).set(collection);
    return collection;
  }

  async getCollection(id: string): Promise<Collection | null> {
    const doc = await db.collection("collections").doc(id).get();
    return doc.exists ? ({ ...doc.data(), id: doc.id } as Collection) : null;
  }

  async getCollections(): Promise<{ data: Collection[]; total: number }> {
    const snapshot = await db.collection("collections").get();
    return {
      data: snapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id }) as Collection
      ),
      total: snapshot.size,
    };
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

  async deleteCollection(id: string): Promise<Collection> {
    const collection = await this.getCollection(id);
    if (!collection) throw new Error("Collection not found");
    await db.collection("collections").doc(id).delete();
    return collection;
  }

  // ---------- ORDERS ----------
  async createOrder(order: Order): Promise<Order> {
    await db.collection("orders").doc(order.id).set(order);
    return order;
  }

  async getOrder(id: string): Promise<Order | null> {
    const doc = await db.collection("orders").doc(id).get();
    return doc.exists ? ({ ...doc.data(), id: doc.id } as Order) : null;
  }

  async getOrders(
    query?: QueryObject
  ): Promise<{ data: Order[]; total: number }> {
    const { limit, page, sortBy, sortOrder } = query || {};
    let q: FirebaseFirestore.Query = db.collection("orders");
    if (sortBy) q = q.orderBy(sortBy, sortOrder || "asc");
    if (page !== undefined && limit) q = q.offset(page * limit);
    if (limit) q = q.limit(limit);
    const snapshot = await q.get();
    return {
      data: snapshot.docs.map(
        (doc) => ({ ...doc.data(), id: doc.id }) as Order
      ),
      total: snapshot.size,
    };
  }

  async updateOrder(id: string, update: Partial<Order>): Promise<Order | null> {
    const order = await this.getOrder(id);
    if (!order) return null;
    const updated = { ...order, ...update };
    await db.collection("orders").doc(id).set(updated);
    return updated;
  }

  async deleteOrder(id: string): Promise<Order> {
    const order = await this.getOrder(id);
    if (!order) throw new Error("Order not found");
    await db.collection("orders").doc(id).delete();
    return order;
  }
}
