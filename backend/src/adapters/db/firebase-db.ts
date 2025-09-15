import { DBAdapter } from "./db-interface";
import { User } from "@models/user";
import { Product } from "@models/product";
import { Order } from "@models/order";
import { getFirestore, doc, setDoc, getDoc } from "firebase-admin/firestore";

// Assume Firebase app initialized elsewhere
const db = getFirestore();

export class FirebaseDB implements DBAdapter {
	async createUser(user: User): Promise<User> {
		await setDoc(doc(db, "users", user.id), user);
		return user;
	}

	async getUser(id: string): Promise<User | null> {
		const docSnap = await getDoc(doc(db, "users", id));
		return docSnap.exists() ? (docSnap.data() as User) : null;
	}

	// Similar implementations for products and orders
	async createProduct(product: Product): Promise<Product> {
		await setDoc(doc(db, "products", product.id), product);
		return product;
	}

	async getProduct(id: string): Promise<Product | null> {
		const docSnap = await getDoc(doc(db, "products", id));
		return docSnap.exists() ? (docSnap.data() as Product) : null;
	}

	async createOrder(order: Order): Promise<Order> {
		await setDoc(doc(db, "orders", order.id), order);
		return order;
	}

	async getOrder(id: string): Promise<Order | null> {
		const docSnap = await getDoc(doc(db, "orders", id));
		return docSnap.exists() ? (docSnap.data() as Order) : null;
	}
}
