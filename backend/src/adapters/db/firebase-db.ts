import { User } from "@models/user";
import { Product } from "@models/product";
import { Order } from "@models/order";
import { DBAdapter } from "@adapters/db/db-interface";
import { db } from "@config/firebase/firebase-admin";

export class FirebaseDB implements DBAdapter {

	// ---------- USERS ----------
	async createUser(user: User): Promise<User> {
		await db.collection("users").doc(user.id).set(user);
		return user;
	}

	async getUser(id: string): Promise<User | null> {
		const docSnap = await db.collection("users").doc(id).get();
		return docSnap.exists ? (docSnap.data() as User) : null;
	}

	async getAllUsers(limit?: number, startAfterId?: string): Promise<User[]> {
		let query = db.collection("users").orderBy("id"); // Firestore requires orderBy for cursors
		if (startAfterId) query = query.startAfter(startAfterId); // Start after last document ID
		if (limit) query = query.limit(limit);                 // Limit number of docs
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

	async getAllProducts(limit?: number, startAfterId?: string): Promise<Product[]> {
		let query = db.collection("products").orderBy("id");
		if (startAfterId) query = query.startAfter(startAfterId);
		if (limit) query = query.limit(limit);
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

	async getAllOrders(limit?: number, startAfterId?: string): Promise<Order[]> {
		let query = db.collection("orders").orderBy("id");
		if (startAfterId) query = query.startAfter(startAfterId);
		if (limit) query = query.limit(limit);
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

