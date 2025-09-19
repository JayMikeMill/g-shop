import Database from "better-sqlite3";
import { initTables } from "./sqlite-modules/migrations";
import { ProductCRUD } from "./sqlite-modules/product-crud";
import { UserCRUD } from "./sqlite-modules/user-crud";
import { OrderCRUD } from "./sqlite-modules/order-crud";
import { DBAdapter } from "./db-adapter";
import { Product, ProductOptionPreset, Category } from "@models/product";
import { User } from "@models/user";
import { Order } from "@models/order";
import { QueryOptions } from "@models/query-options";

export class SQLiteAdapter implements DBAdapter {
  public db: Database.Database;
  public products: ProductCRUD;
  public users: UserCRUD;
  public orders: OrderCRUD;

  constructor(filename: string = "store.sqlite") {
    this.db = new Database(filename);
    initTables(this.db);
    this.products = new ProductCRUD(this.db);
    this.users = new UserCRUD(this.db);
    this.orders = new OrderCRUD(this.db);
  }

  // USERS
  createUser(user: User) {
    return this.users.create(user);
  }
  getUser(id: string) {
    return this.users.get(id);
  }
  getUsers(query?: QueryOptions) {
    return this.users.query(query);
  }
  updateUser(id: string, update: Partial<User>) {
    return this.users.update(id, update);
  }
  deleteUser(id: string) {
    return this.users.delete(id);
  }

  // PRODUCTS
  createProduct(product: Product) {
    return this.products.create(product);
  }
  getProduct(id: number | string) {
    return this.products.get(Number(id));
  }
  getProducts(query?: QueryOptions) {
    return this.products.query(query);
  }
  updateProduct(id: number | string, update: Partial<Product>) {
    return this.products.update(Number(id), update);
  }

  deleteProduct(id: number | string) {
    return this.products.delete(Number(id));
  }

  // PRODUCT OPTIONS PRESETS
  createProductOptionsPreset(
    preset: ProductOptionPreset
  ): Promise<ProductOptionPreset> {
    return this.products.createOptionsPreset(preset);
  }

  getProductOptionsPresets(): Promise<ProductOptionPreset[]> {
    return this.products.getOptionsPresets();
  }

  deleteProductOptionsPreset(id: number | string): Promise<void> {
    return this.products.deleteOptionsPreset(Number(id));
  }

  // CATEGORIES
  createCategory(category: Category) {
    return this.products.createCategory(category);
  }
  getCategory(id: string) {
    return this.products.getCategory(id);
  }
  getCategories() {
    return this.products.getCategories();
  }
  updateCategory(id: string, update: Partial<Category>) {
    return this.products.updateCategory(id, update);
  }
  deleteCategory(id: string) {
    return this.products.deleteCategory(id);
  }

  // ORDERS
  createOrder(order: Order) {
    return this.orders.create(order);
  }
  getOrder(id: string) {
    return this.orders.get(id);
  }
  getOrders(query?: QueryOptions) {
    return this.orders.query(query);
  }
  updateOrder(id: string, update: Partial<Order>) {
    return this.orders.update(id, update);
  }
  deleteOrder(id: string) {
    return this.orders.delete(id);
  }
}
