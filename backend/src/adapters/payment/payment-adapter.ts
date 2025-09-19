import { PaymentRequest } from "@models/payment-info";

export interface PaymentAdapter {
  processPayment(data: PaymentRequest): Promise<any>;
  refundPayment(paymentId: string): Promise<boolean>;
}
