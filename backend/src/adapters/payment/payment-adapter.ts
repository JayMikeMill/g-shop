import { PaymentData } from "@models/payment-data";

export interface PaymentAdapter {
	processPayment(data: PaymentData): Promise<string>;
	refundPayment(paymentId: string): Promise<boolean>;
}
