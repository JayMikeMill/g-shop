import { Product } from "@models/product";
import { db } from "@config/adapters";
import { QueryOptions } from "@models/query-options";

export class ProductService {
  static async createProduct(product: Product): Promise<Product> {
    return db.createProduct(product) as Promise<Product>;
  }

  static async getProduct(id: number | string): Promise<Product | null> {
    return db.getProduct(id) as Promise<Product | null>;
  }

  static async getProducts(query?: QueryOptions): Promise<Product[]> {
    return db.getProducts(query) as Promise<Product[]>;
  }

  static async updateProduct(
    id: number | string,
    update: Partial<Product>
  ): Promise<Product | null> {
    return db.updateProduct(id, update) as Promise<Product | null>;
  }

  static async deleteProduct(id: number | string): Promise<boolean> {
    const existing = await db.getProduct(id);
    if (!existing) return false;
    await db.deleteProduct(id);
    return true;
  }
}
