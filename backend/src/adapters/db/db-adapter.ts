import { User } from "@models/user";
import { Product } from "@models/product";
import { Order } from "@models/order";

export interface DBAdapter {
	// ---------- USERS ----------
	createUser(user: User): Promise<User>;
	getUser(id: string): Promise<User | null>;
	getUsers(options?: { limit?: number; page?: number; sortBy?: string; sortOrder?: "asc" | "desc" }): Promise<User[]>;
	updateUser(id: string, update: Partial<User>): Promise<User | null>;
	deleteUser(id: string): Promise<void>;

	// ---------- PRODUCTS ----------
	createProduct(product: Product): Promise<Product>;
	getProduct(id: string): Promise<Product | null>;
	getProducts(options?: { limit?: number; page?: number; sortBy?: string; sortOrder?: "asc" | "desc" }): Promise<Product[]>;
	updateProduct(id: string, update: Partial<Product>): Promise<Product | null>;
	deleteProduct(id: string): Promise<void>;

	// ---------- ORDERS ----------
	createOrder(order: Order): Promise<Order>;
	getOrder(id: string): Promise<Order | null>;
	getOrders(options?: { limit?: number; page?: number; sortBy?: string; sortOrder?: "asc" | "desc" }): Promise<Order[]>;
	updateOrder(id: string, update: Partial<Order>): Promise<Order | null>;
	deleteOrder(id: string): Promise<void>;
}

