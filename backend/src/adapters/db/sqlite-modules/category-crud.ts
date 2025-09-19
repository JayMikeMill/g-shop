import { Category } from "@models/category";
import Database from "better-sqlite3";

export class CategoryCRUD {
  private db: Database.Database;

  constructor(db: Database.Database) {
    this.db = db;
  }

  async create(category: Category): Promise<Category> {
    try {
      this.db
        .prepare(
          `INSERT INTO categories (id, name, slug, description, image, parent_id, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(
          category.id,
          category.name,
          category.slug,
          category.description ?? null,
          category.image ?? null,
          category.parent_id ?? null,
          category.created_at,
          category.updated_at
        );
      return category;
    } catch (err) {
      throw new Error(`CategoryCRUD.create failed: ${(err as Error).message}`);
    }
  }

  async get(id: string): Promise<Category | null> {
    try {
      const row = this.db
        .prepare(`SELECT * FROM categories WHERE id = ?`)
        .get(id) as Category | undefined;
      return row ?? null;
    } catch (err) {
      throw new Error(`CategoryCRUD.get failed: ${(err as Error).message}`);
    }
  }

  async getAll(): Promise<Category[]> {
    try {
      const rows = this.db
        .prepare(`SELECT * FROM categories`)
        .all() as Category[];
      return rows;
    } catch (err) {
      throw new Error(`CategoryCRUD.getAll failed: ${(err as Error).message}`);
    }
  }

  async update(
    id: string,
    update: Partial<Category>
  ): Promise<Category | null> {
    try {
      const category = await this.get(id);
      if (!category) return null;
      this.db
        .prepare(
          `UPDATE categories SET name = ?, slug = ?, description = ?, image = ?, parent_id = ?, created_at = ?, updated_at = ? WHERE id = ?`
        )
        .run(
          update.name ?? category.name,
          update.slug ?? category.slug,
          update.description ?? category.description ?? null,
          update.image ?? category.image ?? null,
          update.parent_id ?? category.parent_id ?? null,
          update.created_at ?? category.created_at,
          update.updated_at ?? category.updated_at,
          id
        );
      return this.get(id);
    } catch (err) {
      throw new Error(`CategoryCRUD.update failed: ${(err as Error).message}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      this.db.prepare(`DELETE FROM categories WHERE id = ?`).run(id);
    } catch (err) {
      throw new Error(`CategoryCRUD.delete failed: ${(err as Error).message}`);
    }
  }
}
