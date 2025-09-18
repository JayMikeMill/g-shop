import Database from "better-sqlite3";
import { initTables } from "./sqlite-modules/migrations";
import { ProductCRUD } from "./sqlite-modules/product-crud";
import { UserCRUD } from "./sqlite-modules/user-crud";
import { OrderCRUD } from "./sqlite-modules/order-crud";
import { DBAdapter } from "./db-adapter";
import { Product } from "@models/product";
import { User } from "@models/user";
import { Order } from "@models/order";

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

  // delegate methods
  createProduct(product: Product) {
    return this.products.create(product);
  }
  getProduct(id: number | string) {
    return this.products.get(Number(id));
  }
  getProducts() {
    return this.products.getAll();
  }
  updateProduct(id: number | string, update: Partial<Product>) {
    return this.products.update(Number(id), update);
  }
  deleteProduct(id: number | string) {
    return this.products.delete(Number(id));
  }

  createUser(user: User) {
    return this.users.create(user);
  }
  getUser(id: string) {
    return this.users.get(id);
  }
  getUsers() {
    return this.users.getAll();
  }
  updateUser(id: string, update: Partial<User>) {
    return this.users.update(id, update);
  }
  deleteUser(id: string) {
    return this.users.delete(id);
  }

  createOrder(order: Order) {
    return this.orders.create(order);
  }
  getOrder(id: string) {
    return this.orders.get(id);
  }
  getOrders() {
    return this.orders.getAll();
  }
  updateOrder(id: string, update: Partial<Order>) {
    return this.orders.update(id, update);
  }
  deleteOrder(id: string) {
    return this.orders.delete(id);
  }
}
