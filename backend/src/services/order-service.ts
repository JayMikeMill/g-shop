import { Order } from "@models/order";
import { DBAdapter } from "@adapters/db/db-interface";
import { PaymentAdapter } from "@adapters/payment/payment-interface";

export class OrderService {
	constructor(private db: DBAdapter, private payment: PaymentAdapter) {}

	// Create order in DB
	async createOrder(order: Order): Promise<Order> {
		order.status = "pending";
		order.createdAt = new Date();
		return this.db.createOrder(order);
	}

	// Get order by ID
	async getOrder(id: string): Promise<Order | null> {
		return this.db.getOrder(id);
	}

	// Process payment for an order
	async payOrder(orderId: string, source: string): Promise<Order | null> {
		const order = await this.db.getOrder(orderId);
		if (!order) return null;

		const paymentResult = await this.payment.processPayment(order.total, source);
		if (paymentResult.success) {
			order.status = "paid";
			await this.db.createOrder(order); // overwrite
		}

		return order;
	}
}
