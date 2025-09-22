import { PaymentRequest } from "@shared/types/payment-request";
import { SquarePaymentAdapter } from "@adapters/payment/square-payment-adapter";

const adapter = new SquarePaymentAdapter();

export class PaymentService {
  static async processPayment(data: PaymentRequest) {
    return adapter.processPayment(data);
  }

  static async refundPayment(paymentId: string, amount?: number) {
    return adapter.refundPayment(paymentId, amount);
  }
}
