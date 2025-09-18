import Database from "better-sqlite3";
import { randomUUID } from "crypto";
import { User } from "@models/user";
import { QueryOptions } from "@models/query-options";

export class UserCRUD {
  private db: Database.Database;

  constructor(db: Database.Database) {
    this.db = db;
  }

  async create(user: User): Promise<User> {
    const id = user.id || randomUUID();
    const userWithId = { ...user, id };
    this.db
      .prepare("INSERT INTO users (id, data) VALUES (?, ?)")
      .run(id, JSON.stringify(userWithId));
    return userWithId;
  }

  async get(id: string): Promise<User | null> {
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

  async query(query?: QueryOptions): Promise<User[]> {
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

  async update(id: string, update: Partial<User>): Promise<User | null> {
    const user = await this.get(id);
    if (!user) return null;
    const updated = { ...user, ...update };
    this.db
      .prepare("UPDATE users SET data = ? WHERE id = ?")
      .run(JSON.stringify(updated), id);
    return updated;
  }

  async delete(id: string): Promise<void> {
    this.db.prepare("DELETE FROM users WHERE id = ?").run(id);
  }
}
