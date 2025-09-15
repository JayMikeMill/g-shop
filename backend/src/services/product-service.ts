import { Product } from "@models/product";
import { DBAdapter } from "@adapters/db/db-interface";

export class ProductService {
	constructor(private db: DBAdapter) {}

	async createProduct(product: Product): Promise<Product> {
		return this.db.createProduct(product);
	}

	async getProduct(id: string): Promise<Product | null> {
		return this.db.getProduct(id);
	}

	async getAllProducts(limit?: number, startAfterId?: string): Promise<Product[]> {
		return this.db.getAllProducts(limit, startAfterId); // Paginated fetch
	}

	async updateProduct(id: string, update: Partial<Product>): Promise<Product | null> {
		return this.db.updateProduct(id, update);
	}

	async deleteProduct(id: string): Promise<boolean> {
		const existing = await this.db.getProduct(id);
		if (!existing) return false;
		await this.db.deleteProduct(id);
		return true;
	}
}
