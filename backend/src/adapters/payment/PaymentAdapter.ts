import { PaymentRequest, PaymentResult } from "@my-store/shared";

export interface PaymentAdapter {
  processPayment(data: PaymentRequest): Promise<PaymentResult>;
  authorizePayment(data: PaymentRequest): Promise<PaymentResult>;
  capturePayment(paymentId: string, amount?: number): Promise<PaymentResult>;
  refundPayment(paymentId: string, amount?: number): Promise<PaymentResult>;
}
