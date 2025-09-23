import { Category, Collection } from "@shared/types/Catalog";
import { db } from "@config/adapters";
import { QueryObject } from "@shared/types/QueryObject";

export class CatalogService {
  static async createCategory(category: Category) {
    return db.createCategory(category);
  }

  static async getCategory(id: string) {
    return db.getCategory(id);
  }

  static async getCategories(query: QueryObject) {
    return db.getCategories(query);
  }

  static async updateCategory(
    id: string,
    update: Partial<Category>
  ): Promise<Category | null> {
    return db.updateCategory(id, update);
  }

  static async deleteCategory(id: string) {
    const existing = await db.getCategory(id);
    if (!existing) return null;
    return db.deleteCategory(id);
  }

  // Collections methods would go here
  static async createCollection(collection: Collection) {
    return db.createCollection(collection);
  }
  static async getCollection(id: string) {
    return db.getCollection(id);
  }
  static async getCollections(query: QueryObject) {
    return db.getCollections(query);
  }
  static async updateCollection(id: string, update: Partial<Collection>) {
    return db.updateCollection(id, update);
  }
  static async deleteCollection(id: string) {
    const existing = await db.getCollection(id);
    if (!existing) return null;
    return db.deleteCollection(id);
  }
}
