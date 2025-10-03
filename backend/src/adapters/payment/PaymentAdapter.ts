import { PaymentRequest } from "@shared/types";

export interface PaymentAdapter {
  processPayment(data: PaymentRequest): Promise<any>;
  refundPayment(paymentId: string): Promise<boolean>;
}
