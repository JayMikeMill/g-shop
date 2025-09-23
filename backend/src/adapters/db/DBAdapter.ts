import { User } from "@shared/types/User";
import {
  Product,
  ProductOptionPreset,
  ProductTag,
  ProductTagPreset,
} from "@shared/types/Product";
import { Category, Collection } from "@shared/types/Catalog";
import { Order } from "@shared/types/Order";
import { QueryObject } from "@shared/types/QueryObject";

export interface DBAdapter {
  // ---------- USERS ----------
  createUser(user: User): Promise<User>;
  getUser(id: string): Promise<User | null>;
  getUsers(query?: QueryObject): Promise<User[]>;
  updateUser(id: string, update: Partial<User>): Promise<User | null>;
  deleteUser(id: string): Promise<void>;

  // ---------- PRODUCTS ----------
  createProduct(product: Product): Promise<Product>;
  getProduct(id: string): Promise<Product | null>;
  getProducts(query?: QueryObject): Promise<{ data: Product[]; total: number }>;
  updateProduct(id: string, update: Partial<Product>): Promise<Product | null>;
  deleteProduct(id: string): Promise<void>;

  // ---------- OPTIONS PRESETS ----------
  createProductOptionsPreset(
    preset: ProductOptionPreset
  ): Promise<ProductOptionPreset>;
  getProductOptionsPresets(): Promise<ProductOptionPreset[]>;
  deleteProductOptionsPreset(id: string): Promise<void>;

  // ---------- PRODUCT TAGS ----------
  createProductTagPreset(tag: ProductTag): Promise<ProductTagPreset>;
  getProductTagPreset(id: string): Promise<ProductTagPreset | null>;
  getProductTagPresets(query?: QueryObject): Promise<ProductTagPreset[]>;
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
  getOrders(query?: QueryObject): Promise<Order[]>;
  updateOrder(id: string, update: Partial<Order>): Promise<Order | null>;
  deleteOrder(id: string): Promise<void>;
}
