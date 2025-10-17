// frontend/src/components/forms/payment-forms/PaymentFormStripe.tsx
import React, { forwardRef, useImperativeHandle } from "react";

import { loadStripe } from "@stripe/stripe-js";

import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import { inputStyle } from "@components/ui";
import type { Address } from "shared/types";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export interface StripePaymentFormHandle {
  handlePayment: (
    billingAdress?: Address
  ) => Promise<import("@stripe/stripe-js").PaymentMethod | undefined>;
}

function InnerStripeForm(_: unknown, ref: React.Ref<StripePaymentFormHandle>) {
  const stripe = useStripe();
  const elements = useElements();

  useImperativeHandle(ref, () => ({
    // Expose the handlePayment function to the parent component
    handlePayment: async (billingAdress?: Address) => {
      // Check that Stripe.js has loaded
      if (!stripe || !elements) throw new Error("Stripe not loaded");

      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Card element not found");

      // Try to create a payment method using the card Element
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: billingAdress?.name,
          email: billingAdress?.email,
          phone: billingAdress?.phone,
          address: {
            line1: billingAdress?.street1,
            line2: billingAdress?.street2,
            city: billingAdress?.city,
            state: billingAdress?.state,
            postal_code: billingAdress?.postalCode,
            country: "US",
          },
        },
      });

      // Handle any errors from Stripe.js
      if (error) {
        console.error("Stripe payment method error:", error);
        throw new Error("Payment method creation failed");
      }

      (paymentMethod as any)._paymentType = "stripe";

      return paymentMethod;
    },
  }));

  return (
    <CardElement
      className={inputStyle + " p-2"}
      options={{
        style: {
          base: {
            fontSize: "16px",
            color: getComputedStyle(document.documentElement).getPropertyValue(
              "--color-text"
            ),
            fontFamily: "inherit",
            "::placeholder": {
              color: getComputedStyle(
                document.documentElement
              ).getPropertyValue("--color-text-secondary"),
            },
          },
          invalid: {
            color: getComputedStyle(document.documentElement).getPropertyValue(
              "--color-danger"
            ),
          },
        },
      }}
    />
  );
}

const ForwardedInnerStripeForm = forwardRef(InnerStripeForm);

export default function StripePaymentForm(props: {
  formRef: React.Ref<StripePaymentFormHandle>;
}) {
  return (
    <Elements stripe={stripePromise}>
      <ForwardedInnerStripeForm ref={props.formRef} />
    </Elements>
  );
}
