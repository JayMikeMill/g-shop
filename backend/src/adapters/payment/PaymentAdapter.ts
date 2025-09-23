import { PaymentRequest } from "@shared/types/PaymentRequest";

export interface PaymentAdapter {
  processPayment(data: PaymentRequest): Promise<any>;
  refundPayment(paymentId: string): Promise<boolean>;
}
