import { User } from "@shared/types/User";
import {
  Product,
  ProductOption,
  ProductOptionsPreset,
  ProductTag,
} from "@shared/types/Product";
import { Category, Collection } from "@shared/types/Catalog";
import { Order } from "@shared/types/Order";
import { QueryObject } from "@shared/types/QueryObject";

export interface DBAdapter {
  // ---------- USERS ----------
  createUser(user: User): Promise<User>;
  getUser(id: string): Promise<User | null>;
  getUsers(query?: QueryObject): Promise<{ data: User[]; total: number }>;
  updateUser(id: string, update: Partial<User>): Promise<User | null>;
  deleteUser(id: string): Promise<User>;

  // ---------- PRODUCTS ----------
  createProduct(product: Product): Promise<Product>;
  getProduct(id: string): Promise<Product | null>;
  getProducts(query?: QueryObject): Promise<{ data: Product[]; total: number }>;
  updateProduct(id: string, update: Partial<Product>): Promise<Product | null>;
  deleteProduct(id: string): Promise<Product>;

  // ---------- OPTIONS PRESETS ----------
  createProductOptionsPreset(
    preset: ProductOptionsPreset
  ): Promise<ProductOptionsPreset>;
  getProductOptionsPresets(): Promise<{
    data: ProductOptionsPreset[];
    total: number;
  }>;
  deleteProductOptionsPreset(id: string): Promise<ProductOptionsPreset>;

  // ---------- PRODUCT TAGS ----------
  createProductTag(tag: ProductTag): Promise<ProductTag>;
  getProductTag(id: string): Promise<ProductTag | null>;
  getProductTags(
    query?: QueryObject
  ): Promise<{ data: ProductTag[]; total: number }>;
  deleteProductTag(id: string): Promise<ProductTag>;

  // ---------- CATALOG ----------
  // ---------- CATEGORIES ----------
  createCategory(category: Category): Promise<Category>;
  getCategory(id: string): Promise<Category | null>;
  getCategories(): Promise<{ data: Category[]; total: number }>;
  updateCategory(
    id: string,
    update: Partial<Category>
  ): Promise<Category | null>;
  deleteCategory(id: string): Promise<Category>;

  // ---------- COLLECTIONS ----------
  createCollection(collection: Collection): Promise<Collection>;
  getCollection(id: string): Promise<Collection | null>;
  getCollections(): Promise<{ data: Collection[]; total: number }>;
  updateCollection(
    id: string,
    update: Partial<Collection>
  ): Promise<Collection | null>;
  deleteCollection(id: string): Promise<Collection>;

  // ---------- ORDERS ----------
  createOrder(order: Order): Promise<Order>;
  getOrder(id: string): Promise<Order | null>;
  getOrders(query?: QueryObject): Promise<{ data: Order[]; total: number }>;
  updateOrder(id: string, update: Partial<Order>): Promise<Order | null>;
  deleteOrder(id: string): Promise<Order>;
}
