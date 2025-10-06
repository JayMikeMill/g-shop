import { PaymentAdapter } from "./PaymentAdapter";
import { OrderShippingInfo, PaymentRequest } from "@my-store/shared";

import { SquareClient, SquareEnvironment, Square } from "square";

import crypto from "crypto"; // For idempotency keys
import SuperJSON from "superjson";
import { env } from "@config/envVars";

// Initialize Square client
const client = new SquareClient({
  token: env.SQUARE_ACCESS_TOKEN as string,
  environment: SquareEnvironment.Sandbox,
});

export class SquarePaymentAdapter implements PaymentAdapter {
  async processPayment(data: PaymentRequest) {
    const { token, amount, items, shippingInfo } = data;

    console.log("Processing payment with info:", data);
    console.log("Using Square access token:", process.env.SQUARE_ACCESS_TOKEN);

    // Create the payment request
    const requestBody: Square.CreatePaymentRequest = {
      sourceId: token || "cnon:card-nonce-ok", // Sandbox default nonce
      idempotencyKey: crypto.randomUUID(), // Prevent duplicate charges
      amountMoney: {
        amount: BigInt(Math.round(amount * 100)), // Dollars → cents
        currency: "USD",
      },
      note: `Order with ${items?.length || 0} items`,
      shippingAddress: mapToSquareAddress(shippingInfo),
    };

    // Call Square API
    const response = await client.payments.create(requestBody);
    const payment = SuperJSON.serialize(response.payment);

    // Serialize safely
    const result = JSON.parse(JSON.stringify(payment.json));
    console.log("Square payment response:", result);

    return result;
  }

  async refundPayment(paymentId: string, amount?: number) {
    const refunds = client.refunds;

    // Get original payment to determine amount if not provided
    const paymentResponse = await client.payments.get({ paymentId });
    const paymentAmount =
      paymentResponse.payment?.amountMoney?.amount || BigInt(0);
    const refundAmount =
      amount !== undefined ? BigInt(Math.round(amount * 100)) : paymentAmount;

    const requestBody = {
      idempotencyKey: crypto.randomUUID(),
      paymentId,
      amountMoney: {
        amount: refundAmount,
        currency: "USD" as Square.Currency,
      },
    };

    const response = await refunds.refundPayment(requestBody);

    return response.refund?.status === "COMPLETED";
  }
}

// Function to map custom ShippingAddress to Square.Address
const mapToSquareAddress = (info: OrderShippingInfo): Square.Address => ({
  firstName: info.name,
  lastName: info.name,
  addressLine1: info.line1,
  addressLine2: info.line1,
  locality: info.city,
  administrativeDistrictLevel1: info.state,
  postalCode: info.postalCode,
  country: info.country as Square.Country,
});
