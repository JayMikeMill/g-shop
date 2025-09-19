import { Category } from "@models/category";
import { db } from "@config/adapters";

export class CategoryService {
  static async createCategory(category: Category): Promise<Category> {
    return db.createCategory(category);
  }

  static async getCategory(id: string): Promise<Category | null> {
    return db.getCategory(id);
  }

  static async getCategories(): Promise<Category[]> {
    return db.getCategories();
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
}
