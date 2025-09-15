import { User } from "@models/user";
import { Product } from "@models/product";
import { Order } from "@models/order";

export interface DBAdapter {
	// Users
	createUser(user: User): Promise<User>;
	getUser(id: string): Promise<User | null>;

	// Products
	createProduct(product: Product): Promise<Product>;
	getProduct(id: string): Promise<Product | null>;

	// Orders
	createOrder(order: Order): Promise<Order>;
	getOrder(id: string): Promise<Order | null>;
}
