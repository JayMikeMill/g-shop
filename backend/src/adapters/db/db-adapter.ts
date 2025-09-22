import { User } from "@shared/types/user";
import {
  Product,
  ProductOptionPreset,
  ProductTag,
  ProductTagPreset,
} from "@shared/types/product";
import { Category, Collection } from "@shared/types/catalog";
import { Order } from "@shared/types/order";
import { QueryOptions } from "@shared/types/query-options";

export interface DBAdapter {
  // ---------- USERS ----------
  createUser(user: User): Promise<User>;
  getUser(id: string): Promise<User | null>;
  getUsers(query?: QueryOptions): Promise<User[]>;
  updateUser(id: string, update: Partial<User>): Promise<User | null>;
  deleteUser(id: string): Promise<void>;

  // ---------- PRODUCTS ----------
  createProduct(product: Product): Promise<Product>;
  getProduct(id: string): Promise<Product | null>;
  getProducts(query?: QueryOptions): Promise<Product[]>;
  updateProduct(id: string, update: Partial<Product>): Promise<Product | null>;
  deleteProduct(id: string): Promise<void>;

  // ---------- OPTIONS PRESETS ----------
  createProductOptionsPreset(
    preset: ProductOptionPreset
  ): Promise<ProductOptionPreset>;
  getProductOptionsPresets(): Promise<ProductOptionPreset[]>;
  deleteProductOptionsPreset(id: string): Promise<void>;

  // ---------- PRODUCTTAGS ----------
  createProductTagPreset(tag: ProductTag): Promise<ProductTagPreset>;
  getProductTagPreset(id: string): Promise<ProductTagPreset | null>;
  getProductTagPresets(query?: QueryOptions): Promise<ProductTagPreset[]>;
  deleteProductTagPreset(id: string): Promise<void>;

  // ---------- CATALOG ----------
  // ---------- CATEGORIES ----------
  createCategory(category: Category): Promise<Category>;
  getCategory(id: string): Promise<Category | null>;
  getCategories(): Promise<Category[]>;
  updateCategory(
    id: string,
    update: Partial<Category>
  ): Promise<Category | null>;
  deleteCategory(id: string): Promise<void>;

  // ---------- COLLECTIONS ----------
  createCollection(collection: Collection): Promise<Collection>;
  getCollection(id: string): Promise<Collection | null>;
  getCollections(): Promise<Collection[]>;
  updateCollection(
    id: string,
    update: Partial<Collection>
  ): Promise<Collection | null>;
  deleteCollection(id: string): Promise<void>;

  // ---------- ORDERS ----------
  createOrder(order: Order): Promise<Order>;
  getOrder(id: string): Promise<Order | null>;
  getOrders(query?: QueryOptions): Promise<Order[]>;
  updateOrder(id: string, update: Partial<Order>): Promise<Order | null>;
  deleteOrder(id: string): Promise<void>;
}
