export interface PaymentAdapter {
	processPayment(amount: number, source: string): Promise<{ success: boolean; id: string }>;
	refundPayment(paymentId: string): Promise<boolean>;
}
