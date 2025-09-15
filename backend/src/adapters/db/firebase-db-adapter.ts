// backend/src/adapters/db/firebase-db-adapter.ts
import { User } from "@models/user";
import { Product } from "@models/product";
import { Order } from "@models/order";
import { DBAdapter } from "@adapters/db/db-adapter";
import { db } from "@config/firebase/firebase-admin";

export class FirebaseDBAdapter implements DBAdapter {
	// ---------- USERS ----------
	async createUser(user: User): Promise<User> {
		await db.collection("users").doc(user.id).set(user);
		return user;
	}

	async getUser(id: string): Promise<User | null> {
		const docSnap = await db.collection("users").doc(id).get();
		return docSnap.exists ? (docSnap.data() as User) : null;
	}

	async getUsers(options?: { limit?: number; page?: number; sortBy?: string; sortOrder?: "asc" | "desc" }): Promise<User[]> {
		const { limit, page, sortBy, sortOrder } = options || {};
		let query: FirebaseFirestore.Query = db.collection("users");
		if (sortBy) {
			query = query.orderBy(sortBy, sortOrder || "asc");
		}
		if (page !== undefined && limit) {
			// Skip to the correct page using offset
			query = query.offset(page * limit);
		}
		if (limit) {
			query = query.limit(limit);
		}
		const snapshot = await query.get();
		return snapshot.docs.map(doc => doc.data() as User);
	}

	async updateUser(id: string, update: Partial<User>): Promise<User | null> {
		const user = await this.getUser(id);
		if (!user) return null;
		const updated = { ...user, ...update };
		await db.collection("users").doc(id).set(updated); // overwrite
		return updated;
	}

	async deleteUser(id: string): Promise<void> {
		await db.collection("users").doc(id).delete();
	}

	// ---------- PRODUCTS ----------
	async createProduct(product: Product): Promise<Product> {
		await db.collection("products").doc(product.id).set(product);
		return product;
	}

	async getProduct(id: string): Promise<Product | null> {
		const docSnap = await db.collection("products").doc(id).get();
		return docSnap.exists ? (docSnap.data() as Product) : null;
	}

	async getProducts(options?: { limit?: number; page?: number; sortBy?: string; sortOrder?: "asc" | "desc" }): Promise<Product[]> {
		const { limit, page, sortBy, sortOrder } = options || {};
		let query: FirebaseFirestore.Query = db.collection("products");
		if (sortBy) {
			query = query.orderBy(sortBy, sortOrder || "asc");
		}
		if (page !== undefined && limit) {
			query = query.offset(page * limit);
		}
		if (limit) {
			query = query.limit(limit);
		}
		const snapshot = await query.get();
		return snapshot.docs.map(doc => doc.data() as Product);
	}

	async updateProduct(id: string, update: Partial<Product>): Promise<Product | null> {
		const product = await this.getProduct(id);
		if (!product) return null;
		const updated = { ...product, ...update };
		await db.collection("products").doc(id).set(updated);
		return updated;
	}

	async deleteProduct(id: string): Promise<void> {
		await db.collection("products").doc(id).delete();
	}

	// ---------- ORDERS ----------
	async createOrder(order: Order): Promise<Order> {
		await db.collection("orders").doc(order.id).set(order);
		return order;
	}

	async getOrder(id: string): Promise<Order | null> {
		const docSnap = await db.collection("orders").doc(id).get();
		return docSnap.exists ? (docSnap.data() as Order) : null;
	}

	async getOrders(options?: { limit?: number; page?: number; sortBy?: string; sortOrder?: "asc" | "desc" }): Promise<Order[]> {
		const { limit, page, sortBy, sortOrder } = options || {};
		let query: FirebaseFirestore.Query = db.collection("orders");
		if (sortBy) {
			query = query.orderBy(sortBy, sortOrder || "asc");
		}
		if (page !== undefined && limit) {
			query = query.offset(page * limit);
		}
		if (limit) {
			query = query.limit(limit);
		}
		const snapshot = await query.get();
		return snapshot.docs.map(doc => doc.data() as Order);
	}

	async updateOrder(id: string, update: Partial<Order>): Promise<Order | null> {
		const order = await this.getOrder(id);
		if (!order) return null;
		const updated = { ...order, ...update };
		await db.collection("orders").doc(id).set(updated);
		return updated;
	}

	async deleteOrder(id: string): Promise<void> {
		await db.collection("orders").doc(id).delete();
	}
}

