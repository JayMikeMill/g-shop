import { Order } from "@models/order";
import { DBAdapter } from "@adapters/db/db-adapter";
import { PaymentAdapter } from "@adapters/payment/payment-adapter";

export class OrderService {
	constructor(private db: DBAdapter, private payment: PaymentAdapter) {}

	async createOrder(order: Order): Promise<Order> {
		order.status = "pending";
		order.createdAt = Date.now();
		return this.db.createOrder(order);
	}

	async getOrder(id: string): Promise<Order | null> {
		return this.db.getOrder(id);
	}

	async getAllOrders(limit?: number, startAfterId?: string): Promise<Order[]> {
		return this.db.getAllOrders(limit, startAfterId); // Paginated fetch
	}

	async updateOrder(id: string, update: Partial<Order>): Promise<Order | null> {
		return this.db.updateOrder(id, update);
	}

	async deleteOrder(id: string): Promise<void> {
		await this.db.deleteOrder(id);
	}
}
