import { Order } from "@models/order";
import { DBAdapter } from "@adapters/db/db-interface";
import { PaymentAdapter } from "@adapters/payment/payment-interface";

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

	async payOrder(orderId: string, source: string): Promise<Order | null> {
		const order = await this.db.getOrder(orderId);
		if (!order) return null;

		const paymentResult = await this.payment.processPayment(order.total, source);
		if (paymentResult.success) {
			order.status = "paid";
			await this.db.createOrder(order); // overwrite in DB
		}

		return order;
	}
}
