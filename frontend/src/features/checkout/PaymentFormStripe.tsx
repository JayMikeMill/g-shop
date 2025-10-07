// frontend/src/components/forms/payment-forms/PaymentFormStripe.tsx
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import {
  type CartItem,
  type OrderShippingInfo,
  TransactionStatus as TransactionStatuses,
  PaymentMethod as PaymentMethods,
  OrderStatus as OrderStatuses,
  type Order,
} from "@my-store/shared";

import { useApi } from "@api/useApi";
import { Button } from "@components/ui";
import { floatToPrice } from "@utils/productUtils";

interface StripePaymentFormProps {
  total: number;
  cartItems: CartItem[];
  shippingInfo: OrderShippingInfo;
  setLoading: (loading: boolean) => void;
  setMessage: (msg: string | null) => void;
}

// Load Stripe publishable key from environment
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function InnerStripeForm({
  total,
  shippingInfo,
  setLoading,
  setMessage,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { placeOrder, orders } = useApi();

  // Mutation for orders
  const createOrder = orders.create();

  const handlePayment = async () => {
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    try {
      setLoading(true);

      // Create payment method on Stripe
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: shippingInfo.name,
          address: {
            line1: shippingInfo.line1,
            line2: shippingInfo.line2,
            city: shippingInfo.city,
            state: shippingInfo.state,
            postal_code: shippingInfo.postalCode,
            country: shippingInfo.country,
          },
        },
      });

      if (error) {
        setMessage(error.message || "Payment method creation failed");
        return;
      }

      const order: Order = {
        total: floatToPrice(total),
        status: OrderStatuses.PAID,
        statusHistory: [
          {
            status: OrderStatuses.PAID,
            timestamp: new Date(),
          },
        ],
        transaction: {
          method: PaymentMethods.STRIPE,
          amount: total,
          currency: "USD",
          status: TransactionStatuses.PAID,
        },
        shippingInfo,
        invoices: [
          { createdAt: new Date(), invoiceNumber: `INV-${Date.now()}` },
        ],
      };

      // Send paymentMethod.id to backend
      const response = await placeOrder(paymentMethod, order);

      const payment = (response as any).payment;
      if (payment?.status === "succeeded") {
        await onSuccess(payment);
      } else {
        setMessage("Payment failed: " + (payment?.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Stripe payment error:", err);
      setMessage("Payment could not be processed");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const onSuccess = async (payment: any) => {
    setMessage("Payment successful!");

    try {
      await createOrder.mutateAsync({
        total: floatToPrice(total),
        status: OrderStatuses.PAID,
        statusHistory: [
          {
            status: OrderStatuses.PAID,
            timestamp: new Date(),
          },
        ],
        transaction: {
          method: PaymentMethods.STRIPE,
          amount: payment.amount,
          currency: payment.currency,
          status: TransactionStatuses.PAID,
        },
        shippingInfo,
        invoices: [
          { createdAt: new Date(), invoiceNumber: `INV-${Date.now()}` },
        ],
      });
    } catch (err) {
      console.error("Order creation failed:", err);
      setMessage("Order could not be saved");
    }
  };

  return (
    <div className="surface-box p-lg flex flex-col gap-md text-text font-sans">
      <h3 className="text-xl mb-lg text-center font-bold">Payment Info</h3>
      <p className="text-lg font-semibold text-text text-right md:text-left">
        Total: ${total.toFixed(2)}
      </p>

      <div className="w-full h-auto mb-md border border-border rounded-md bg-background p-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: getComputedStyle(
                  document.documentElement
                ).getPropertyValue("--color-text"),
                fontFamily: "inherit",
                "::placeholder": {
                  color: getComputedStyle(
                    document.documentElement
                  ).getPropertyValue("--color-text-secondary"),
                },
              },
              invalid: {
                color: getComputedStyle(
                  document.documentElement
                ).getPropertyValue("--color-danger"),
              },
            },
          }}
        />
      </div>
      <Button
        onClick={handlePayment}
        className="w-full"
        disabled={!stripe || !elements}
      >
        Pay Now
      </Button>
    </div>
  );
}

// Wrap in Elements provider
export default function StripePaymentFormWrapper(
  props: StripePaymentFormProps
) {
  return (
    <Elements stripe={stripePromise}>
      <InnerStripeForm {...props} />
    </Elements>
  );
}
