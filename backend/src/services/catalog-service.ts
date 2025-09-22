import { Category, Collection } from "@shared/types/catalog";
import { db } from "@config/adapters";
import { QueryOptions } from "@shared/types/query-options";

export class CatalogService {
  static async createCategory(category: Category): Promise<Category> {
    return db.createCategory(category);
  }

  static async getCategory(id: string): Promise<Category | null> {
    return db.getCategory(id);
  }

  static async getCategories(query: QueryOptions): Promise<Category[]> {
    return db.getCategories(query);
  }

  static async updateCategory(
    id: string,
    update: Partial<Category>
  ): Promise<Category | null> {
    return db.updateCategory(id, update);
  }

  static async deleteCategory(id: string): Promise<boolean> {
    const existing = await db.getCategory(id);
    if (!existing) return false;
    await db.deleteCategory(id);
    return true;
  }

  // Collections methods would go here
  static async createCollection(collection: Collection): Promise<Collection> {
    return db.createCollection(collection);
  }
  static async getCollection(id: string): Promise<Collection | null> {
    return db.getCollection(id);
  }
  static async getCollections(query: QueryOptions): Promise<Collection[]> {
    return db.getCollections(query);
  }
  static async updateCollection(
    id: string,
    update: Partial<Collection>
  ): Promise<Collection | null> {
    return db.updateCollection(id, update);
  }
  static async deleteCollection(id: string): Promise<boolean> {
    const existing = await db.getCollection(id);
    if (!existing) return false;
    await db.deleteCollection(id);
    return true;
  }
}
