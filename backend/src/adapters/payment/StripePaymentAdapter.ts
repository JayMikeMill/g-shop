import { PaymentAdapter } from "./PaymentAdapter";
import { PaymentRequest } from "@my-store/shared";
import Stripe from "stripe";
import SuperJSON from "superjson";
import { env } from "@config/envVars";
import { OrderShippingInfo } from "@my-store/shared";

// Initialize Stripe client
const stripe = new Stripe(env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-08-27.basil",
});

export class StripePaymentAdapter implements PaymentAdapter {
  async processPayment(data: PaymentRequest) {
    const { token, amount, items, shippingInfo } = data;

    console.log("Processing payment with info:", data);
    console.log("Using Stripe secret key:", process.env.STRIPE_SECRET_KEY);

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Dollars → cents
      currency: "usd",
      payment_method: token, // The payment token from frontend
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never", // prevents redirect-based methods
      },
      metadata: {
        note: `Order with ${items?.length || 0} items`,
      },
      shipping: shippingInfo ? mapToStripeShipping(shippingInfo) : undefined,
    });

    const serialized = SuperJSON.serialize(paymentIntent);

    // Return safe JSON
    return JSON.parse(JSON.stringify(serialized.json));
  }

  async refundPayment(paymentId: string, amount?: number) {
    const refund = await stripe.refunds.create({
      payment_intent: paymentId,
      amount: amount ? Math.round(amount * 100) : undefined,
    });

    return refund.status === "succeeded";
  }
}

// Map your custom address type to Stripe shipping
const mapToStripeShipping = (info: OrderShippingInfo) => ({
  name: `${info.name}`,
  address: {
    line1: info.line1,
    line2: info.line2,
    city: info.city,
    state: info.state,
    postal_code: info.postalCode,
    country: info.country,
  },
});
