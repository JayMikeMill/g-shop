import { PaymentData } from "@models/payment-data";

export interface PaymentAdapter {
	processPayment(data: PaymentData): Promise<any>;
	refundPayment(paymentId: string): Promise<boolean>;
}
