import { PaymentAdapter } from "./payment-interface";
import { Client, Environment } from "square";

const client = new Client({
	environment: Environment.Sandbox,
	accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

export class SquarePayment implements PaymentAdapter {
	async processPayment(amount: number, source: string) {
		const paymentsApi = client.paymentsApi;
		const response = await paymentsApi.createPayment({
			sourceId: source,
			idempotencyKey: crypto.randomUUID(),
			amountMoney: { amount: BigInt(amount * 100), currency: "USD" },
		});
		return { success: true, id: response.result.payment?.id || "" };
	}

	async refundPayment(paymentId: string) {
		const refundsApi = client.refundsApi;
		const response = await refundsApi.refundPayment({
			paymentId,
			idempotencyKey: crypto.randomUUID(),
			amountMoney: { amount: BigInt(0), currency: "USD" },
		});
		return response.status === "COMPLETED";
	}
}
