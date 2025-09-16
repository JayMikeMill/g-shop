import { PaymentData } from "@models/payment-data";
import { SquarePaymentAdapter } from "@adapters/payment/square-payment-adapter";

const adapter = new SquarePaymentAdapter();

export class PaymentService {
  static async processPayment(data: PaymentData) {
    return adapter.processPayment(data);
  }

  static async refundPayment(paymentId: string, amount?: number) {
    return adapter.refundPayment(paymentId, amount);
  }
}
