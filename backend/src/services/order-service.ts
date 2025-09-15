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

	static async getAllOrders(limit?: number, startAfterId?: string): Promise<Order[]> {
		return db.getAllOrders(limit, startAfterId); // Paginated fetch
	}

	static async updateOrder(id: string, update: Partial<Order>): Promise<Order | null> {
		return db.updateOrder(id, update);
	}

	static async deleteOrder(id: string): Promise<void> {
		await db.deleteOrder(id);
	}
}
