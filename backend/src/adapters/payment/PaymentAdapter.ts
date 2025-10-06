import { PaymentRequest } from "@my-store/shared";

export interface PaymentAdapter {
  processPayment(data: PaymentRequest): Promise<any>;
  refundPayment(paymentId: string): Promise<boolean>;
}
