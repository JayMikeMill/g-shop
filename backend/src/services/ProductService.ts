import {
  Product,
  ProductOption,
  ProductOptionsPreset,
} from "@shared/types/Product";
import { db } from "@config/adapters";
import { QueryObject } from "@shared/types/QueryObject";

export class ProductService {
  static async createProduct(product: Product) {
    return db.createProduct(product);
  }

  static async getProduct(id: string) {
    return db.getProduct(id);
  }

  static async getProducts(query?: QueryObject) {
    return db.getProducts(query);
  }

  static async updateProduct(id: string, update: Partial<Product>) {
    return db.updateProduct(id, update);
  }

  static async deleteProduct(id: string) {
    const existing = await db.getProduct(id);
    if (!existing) return false;
    return db.deleteProduct(id);
  }

  // ---------- OPTIONS PRESETS ----------
  static async createProductOptionsPreset(preset: ProductOptionsPreset) {
    return db.createProductOptionsPreset(preset);
  }
  static async getProductOptionsPresets() {
    return db.getProductOptionsPresets();
  }
  static async deleteProductOptionsPreset(id: string) {
    const existing = await db.getProductOptionsPresets();
    if (!existing.data.find((p) => p.id === id)) return null;
    return db.deleteProductOptionsPreset(id);
  }
}
