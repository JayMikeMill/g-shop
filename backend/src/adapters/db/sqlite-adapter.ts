import Database from "better-sqlite3";
import { randomUUID } from "crypto";
import { DBAdapter } from "./db-adapter";
import { User } from "@models/user";
import { Product } from "@models/product";
import { Order } from "@models/order";

export class SQLiteAdapter implements DBAdapter {
  private db: Database.Database;

  constructor(filename: string = "store.sqlite") {
    this.db = new Database(filename);
    this.init();
  }

  private init() {
    // Users
    this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY UNIQUE,
      data TEXT NOT NULL
    )`
      )
      .run();
    // Products
    this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY UNIQUE,
      data TEXT NOT NULL
    )`
      )
      .run();
    // Orders
    this.db
      .prepare(
        `CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY UNIQUE,
      data TEXT NOT NULL
    )`
      )
      .run();
  }

  // ---------- USERS ----------
  async createUser(user: User): Promise<User> {
    const id = user.id || randomUUID();
    const userWithId = { ...user, id };
    this.db
      .prepare("INSERT INTO users (id, data) VALUES (?, ?)")
      .run(id, JSON.stringify(userWithId));
    return userWithId;
  }
  async getUser(id: string): Promise<User | null> {
    const row = this.db
      .prepare("SELECT data FROM users WHERE id = ?")
      .get(id) as { data: string } | undefined;
    if (!row || typeof row.data !== "string") return null;
    try {
      return JSON.parse(row.data);
    } catch {
      return null;
    }
  }
  async getUsers(): Promise<User[]> {
    const rows = this.db.prepare("SELECT data FROM users").all() as {
      data: string;
    }[];
    return rows
      .map((r) => {
        try {
          return JSON.parse(r.data);
        } catch {
          return null;
        }
      })
      .filter(Boolean);
  }
  async updateUser(id: string, update: Partial<User>): Promise<User | null> {
    const user = await this.getUser(id);
    if (!user) return null;
    const updated = { ...user, ...update };
    this.db
      .prepare("UPDATE users SET data = ? WHERE id = ?")
      .run(JSON.stringify(updated), id);
    return updated;
  }
  async deleteUser(id: string): Promise<void> {
    this.db.prepare("DELETE FROM users WHERE id = ?").run(id);
  }

  // ---------- PRODUCTS ----------
  async createProduct(product: Product): Promise<Product> {
    const id = product.id || randomUUID();
    const productWithId = { ...product, id };
    this.db
      .prepare("INSERT INTO products (id, data) VALUES (?, ?)")
      .run(id, JSON.stringify(productWithId));
    return productWithId;
  }
  async getProduct(id: string): Promise<Product | null> {
    const row = this.db
      .prepare("SELECT data FROM products WHERE id = ?")
      .get(id) as { data: string } | undefined;
    if (!row || typeof row.data !== "string") return null;
    try {
      return JSON.parse(row.data);
    } catch {
      return null;
    }
  }
  async getProducts(): Promise<Product[]> {
    const rows = this.db.prepare("SELECT data FROM products").all() as {
      data: string;
    }[];
    return rows
      .map((r) => {
        try {
          return JSON.parse(r.data);
        } catch {
          return null;
        }
      })
      .filter(Boolean);
  }
  async updateProduct(
    id: string,
    update: Partial<Product>
  ): Promise<Product | null> {
    const product = await this.getProduct(id);
    if (!product) return null;
    const updated = { ...product, ...update };
    this.db
      .prepare("UPDATE products SET data = ? WHERE id = ?")
      .run(JSON.stringify(updated), id);
    return updated;
  }
  async deleteProduct(id: string): Promise<void> {
    this.db.prepare("DELETE FROM products WHERE id = ?").run(id);
  }

  // ---------- ORDERS ----------
  async createOrder(order: Order): Promise<Order> {
    const id = order.id || randomUUID();
    const orderWithId = { ...order, id };
    this.db
      .prepare("INSERT INTO orders (id, data) VALUES (?, ?)")
      .run(id, JSON.stringify(orderWithId));
    return orderWithId;
  }
  async getOrder(id: string): Promise<Order | null> {
    const row = this.db
      .prepare("SELECT data FROM orders WHERE id = ?")
      .get(id) as { data: string } | undefined;
    if (!row || typeof row.data !== "string") return null;
    try {
      return JSON.parse(row.data);
    } catch {
      return null;
    }
  }
  async getOrders(): Promise<Order[]> {
    const rows = this.db.prepare("SELECT data FROM orders").all() as {
      data: string;
    }[];
    return rows
      .map((r) => {
        try {
          return JSON.parse(r.data);
        } catch {
          return null;
        }
      })
      .filter(Boolean);
  }
  // Note: SQLite only supports local file or in-memory databases. It cannot connect to remote servers. For remote DBs, use a different adapter (e.g., PostgreSQL, MySQL).
  async updateOrder(id: string, update: Partial<Order>): Promise<Order | null> {
    const order = await this.getOrder(id);
    if (!order) return null;
    const updated = { ...order, ...update };
    this.db
      .prepare("UPDATE orders SET data = ? WHERE id = ?")
      .run(JSON.stringify(updated), id);
    return updated;
  }
  async deleteOrder(id: string): Promise<void> {
    this.db.prepare("DELETE FROM orders WHERE id = ?").run(id);
  }
}
