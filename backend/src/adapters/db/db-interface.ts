import { User } from "@models/user";
import { Product } from "@models/product";
import { Order } from "@models/order";

export interface DBAdapter {
	// ---------- USERS ----------
	createUser(user: User): Promise<User>;
	getUser(id: string): Promise<User | null>;
	getAllUsers(limit?: number, startAfterId?: string): Promise<User[]>;  // optional pagination
	updateUser(id: string, update: Partial<User>): Promise<User | null>;
	deleteUser(id: string): Promise<void>;

	// ---------- PRODUCTS ----------
	createProduct(product: Product): Promise<Product>;
	getProduct(id: string): Promise<Product | null>;
	getAllProducts(limit?: number, startAfterId?: string): Promise<Product[]>;  // optional pagination
	updateProduct(id: string, update: Partial<Product>): Promise<Product | null>;
	deleteProduct(id: string): Promise<void>;

	// ---------- ORDERS ----------
	createOrder(order: Order): Promise<Order>;
	getOrder(id: string): Promise<Order | null>;
	getAllOrders(limit?: number, startAfterId?: string): Promise<Order[]>;  // optional pagination
	updateOrder(id: string, update: Partial<Order>): Promise<Order | null>;
	deleteOrder(id: string): Promise<void>;
}

