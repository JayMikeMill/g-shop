// frontend/src/components/forms/payment-forms/PaymentFormStripe.tsx
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { type ShippingInfo, type Cart } from "@shared/types";

import { Button } from "@components/ui";
import { useApi } from "@api/useApi";

import { createOrder } from "./createOrder";

interface StripePaymentFormProps {
  cart: Cart;
  shippingInfo: ShippingInfo;
  setLoading: (loading: boolean) => void;
  setMessage: (msg: string | null) => void;
}

// Load Stripe publishable key from environment
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function InnerStripeForm({
  cart,
  shippingInfo,
  setLoading,
  setMessage,
}: StripePaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { placeOrder } = useApi();

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
          name: shippingInfo.address?.name,
          email: shippingInfo.address?.email,
          phone: shippingInfo.address?.phone,
          address: {
            line1: shippingInfo.address?.street1,
            line2: shippingInfo.address?.street2,
            city: shippingInfo.address?.city,
            state: shippingInfo.address?.state,
            postal_code: shippingInfo.address?.postalCode,
            country: "US",
          },
        },
      });

      if (error) {
        setMessage(error.message || "Payment method creation failed");
        return;
      }

      if (!paymentMethod) {
        setMessage("Payment method is undefined");
        return;
      }

      const order = createOrder(cart, shippingInfo);

      // Send paymentMethod.id to backend
      const response = await placeOrder(paymentMethod, order);

      if (response?.success === true) {
        await onSuccess();
        console.log("Payment and order successful:", response);
      } else {
        setMessage("Payment failed: " + (response?.error || "Unknown error"));
      }
    } catch (err) {
      console.error("Stripe payment error:", err);
      setMessage("Payment could not be processed");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const onSuccess = async () => {
    setMessage("Payment successful!");
  };

  return (
    <div className="surface-box p-lg flex flex-col gap-md text-text font-sans">
      <h3 className="text-xl mb-lg text-center font-bold">Payment Info</h3>
      <p className="text-lg font-semibold text-text text-right md:text-left">
        Total: ${cart.total.toFixed(2)}
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
