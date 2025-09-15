import { Product } from "@models/product";
import { DBAdapter } from "@adapters/db/db-interface";

// Product service handles all product-related business logic
export class ProductService {
	constructor(private db: DBAdapter) {}

	// Create a new product
	async createProduct(product: Product): Promise<Product> {
		return this.db.createProduct(product);
	}

	// Get a product by ID
	async getProduct(id: string): Promise<Product | null> {
		return this.db.getProduct(id);
	}

	// Optionally, add update and delete methods
	async updateProduct(id: string, update: Partial<Product>): Promise<Product | null> {
		const product = await this.db.getProduct(id);
		if (!product) return null;
		const updated = { ...product, ...update };
		await this.db.createProduct(updated); // overwrite in DB
		return updated;
	}

	async deleteProduct(id: string): Promise<boolean> {
		// For simplicity, assume FirebaseDB supports deletion
		const existing = await this.db.getProduct(id);
		if (!existing) return false;
		// implement deletion in your DB adapter
		return true;
	}
}
