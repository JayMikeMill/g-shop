import { User } from "@models/user";
import { Product, ProductOptionPreset, Category } from "@models/product";
import { Order } from "@models/order";
import { QueryOptions } from "@models/query-options";

export interface DBAdapter {
  // ---------- USERS ----------
  createUser(user: User): Promise<User>;
  getUser(id: string): Promise<User | null>;
  getUsers(query?: QueryOptions): Promise<User[]>;
  updateUser(id: string, update: Partial<User>): Promise<User | null>;
  deleteUser(id: string): Promise<void>;

  // ---------- PRODUCTS ----------
  createProduct(product: Product): Promise<Product>;
  getProduct(id: number | string): Promise<Product | null>;
  getProducts(query?: QueryOptions): Promise<Product[]>;
  updateProduct(
    id: number | string,
    update: Partial<Product>
  ): Promise<Product | null>;
  deleteProduct(id: number | string): Promise<void>;

  // ---------- OPTIONS PRESETS ----------
  createProductOptionsPreset(
    preset: ProductOptionPreset
  ): Promise<ProductOptionPreset>;
  getProductOptionsPresets(): Promise<ProductOptionPreset[]>;
  deleteProductOptionsPreset(id: number | string): Promise<void>;

  // ---------- CATEGORIES ----------
  createCategory(category: Category): Promise<Category>;
  getCategory(id: string): Promise<Category | null>;
  getCategories(): Promise<Category[]>;
  updateCategory(
    id: string,
    update: Partial<Category>
  ): Promise<Category | null>;
  deleteCategory(id: string): Promise<void>;

  // ---------- ORDERS ----------
  createOrder(order: Order): Promise<Order>;
  getOrder(id: string): Promise<Order | null>;
  getOrders(query?: QueryOptions): Promise<Order[]>;
  updateOrder(id: string, update: Partial<Order>): Promise<Order | null>;
  deleteOrder(id: string): Promise<void>;
}
