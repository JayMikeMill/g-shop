import { Order } from "@models/order";
import { db } from "@config/adapters";

export class OrderService {
	static async createOrder(order: Order): Promise<Order> {
		order.status = "pending";
		order.createdAt = Date.now();
		return db.createOrder(order);
	}

	static async getOrder(id: string): Promise<Order | null> {
		return db.getOrder(id);
	}

	static async getOrders(options?: { limit?: number; page?: number; sortBy?: string; sortOrder?: "asc" | "desc" }): Promise<Order[]> {
		return db.getOrders(options);
	}

	static async updateOrder(id: string, update: Partial<Order>): Promise<Order | null> {
		return db.updateOrder(id, update);
	}

	static async deleteOrder(id: string): Promise<void> {
		await db.deleteOrder(id);
	}
}
