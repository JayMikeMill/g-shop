import { Product } from "@models/product";
import { db } from "@config/adapters";

export class ProductService {
	static async createProduct(product: Product): Promise<Product> {
		return db.createProduct(product);
	}

	static async getProduct(id: string): Promise<Product | null> {
		return db.getProduct(id);
	}

	static async getProducts(options?: { limit?: number; page?: number; sortBy?: string; sortOrder?: "asc" | "desc" }): Promise<Product[]> {
		return db.getProducts(options);
	}

	static async updateProduct(id: string, update: Partial<Product>): Promise<Product | null> {
		return db.updateProduct(id, update);
	}

	static async deleteProduct(id: string): Promise<boolean> {
		const existing = await db.getProduct(id);
		if (!existing) return false;
		await db.deleteProduct(id);
		return true;
	}
}
