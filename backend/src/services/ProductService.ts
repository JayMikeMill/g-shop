import { Product, ProductOptionPreset } from "@shared/types/Product";
import { Category } from "@shared/types/Catalog";
import { db } from "@config/adapters";
import { QueryObject } from "@shared/types/QueryObject";

export class ProductService {
  static async createProduct(product: Product): Promise<Product> {
    return db.createProduct(product) as Promise<Product>;
  }

  static async getProduct(id: string): Promise<Product | null> {
    return db.getProduct(id) as Promise<Product | null>;
  }

  static async getProducts(query?: QueryObject) {
    return db.getProducts(query);
  }

  static async updateProduct(
    id: string,
    update: Partial<Product>
  ): Promise<Product | null> {
    return db.updateProduct(id, update) as Promise<Product | null>;
  }

  static async deleteProduct(id: string): Promise<boolean> {
    const existing = await db.getProduct(id);
    if (!existing) return false;
    await db.deleteProduct(id);
    return true;
  }

  // ---------- OPTIONS PRESETS ----------
  static async createProductOptionsPreset(
    preset: ProductOptionPreset
  ): Promise<ProductOptionPreset> {
    return db.createProductOptionsPreset(preset);
  }
  static async getProductOptionsPresets(): Promise<ProductOptionPreset[]> {
    return db.getProductOptionsPresets();
  }
  static async deleteProductOptionsPreset(id: string): Promise<boolean> {
    const existing = await db.getProductOptionsPresets();
    if (!existing.find((p) => p.id === id)) return false;
    await db.deleteProductOptionsPreset(id);
    return true;
  }

  // ---------- CATEGORY CRUD ----------
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
