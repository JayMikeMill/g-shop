import Database from "better-sqlite3";
import { randomUUID } from "crypto";
import { Order } from "@shared/types/order";
import { QueryOptions } from "@shared/types/query-options";

export class OrderCRUD {
  private db: Database.Database;

  constructor(db: Database.Database) {
    this.db = db;
  }

  async create(order: Order): Promise<Order> {
    const id = order.id || randomUUID();
    const orderWithId = { ...order, id };
    this.db
      .prepare("INSERT INTO orders (id, data) VALUES (?, ?)")
      .run(id, JSON.stringify(orderWithId));
    return orderWithId;
  }
  async get(id: string): Promise<Order | null> {
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
  async query(query?: QueryOptions): Promise<Order[]> {
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
  async update(id: string, update: Partial<Order>): Promise<Order | null> {
    const order = await this.get(id);
    if (!order) return null;
    const updated = { ...order, ...update };
    this.db
      .prepare("UPDATE orders SET data = ? WHERE id = ?")
      .run(JSON.stringify(updated), id);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.db.prepare("DELETE FROM orders WHERE id = ?").run(id);
  }
}
