import { useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

import type { Order, ShippingInfo } from "shared/types";

import { useCart } from "@app/hooks";
import { createOrder } from "./createOrder";

//import { zodResolver } from "@hookform/resolvers/zod";
import { type CheckoutFormType } from "./CheckoutSchema";

import { Button, Label } from "@components/ui";

import ShippingForm from "./ShippingForm";

import StripePaymentForm, {
  type StripePaymentFormHandle,
} from "./PaymentFormStripe";
import CartContents from "@features/cart/CartContents";

interface CheckoutFormProps {
  onSubmit: (order: Order, paymentMethod: any) => void;
}
export default function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { cart } = useCart();

  const methods = useForm<CheckoutFormType>({
    defaultValues: {
      shippingInfo: {
        address: demoAddress,
      },
      paymentMethod: {},
    },
    mode: "onChange",
  });

  const stripeFormRef = useRef<StripePaymentFormHandle>(null);

  const handleSubmit = async (data: CheckoutFormType) => {
    console.log("Checking out with data:", data);

    try {
      const { order: newOrder, error } = await createOrder(
        cart,
        data.shippingInfo as ShippingInfo
      );

      if (error) {
        if (error === "ADDRESS_VERIFICATION_FAILED") {
          setErrorMessage(
            "Address verification failed. Please check your shipping address."
          );
        } else {
          setErrorMessage("Error creating order: " + error);
          throw new Error(error);
        }
        return;
      }
      if (!newOrder) throw new Error("Order creation failed");

      console.log("Order created:", newOrder);

      const billingAddress = newOrder.shippingInfo!.address!;

      console.log("Submitting payment...", billingAddress);

      // Create payment method
      const paymentMethod =
        await stripeFormRef.current?.handlePayment(billingAddress);

      if (!paymentMethod) throw new Error("Payment method creation failed");

      console.log("Payment method created:", paymentMethod);

      onSubmit(newOrder, paymentMethod);
    } catch (err) {
      console.error("Order Placement Error:", err);
    }
  };

  if (cart.totalItems === 0) {
    return (
      <div className="bg-surface p-md rounded-md shadow-md h-64 items-center justify-center flex">
        <div className="mx-auto text-center text-2xl">
          <p>Your cart is empty.</p>
        </div>
      </div>
    );
  }
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="flex flex-col gap-md sm:gap-lg py-md sm:py-lg"
      >
        <div className="flex flex-col bg-surface p-md gap-lg rounded-md shadow-md">
          <Label className="text-2xl pt-md text-center font-semibold w-full">
            Order Summary
          </Label>
          <div className="flex flex-col gap-4 bg-surface">
            <CartContents isSummary />
          </div>
        </div>
        <div className="flex flex-col bg-surface p-md gap-lg rounded-md shadow-md">
          <Label className="text-2xl pt-md text-center font-semibold w-full">
            Shipping Information
          </Label>
          <ShippingForm />
        </div>
        <div className="flex flex-col bg-surface p-md gap-lg rounded-md shadow-md">
          <Label className="text-2xl pt-md text-center font-semibold w-full">
            Payment Information
          </Label>
          <DemoLabel />
          <StripePaymentForm formRef={stripeFormRef} />
          {errorMessage && (
            <div className="text-red-600 text-center">{errorMessage}</div>
          )}

          <Button
            type="submit"
            className="h-12 btn btn-primary text-xl font-semibold"
          >
            Checkout
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

// demo address
const demoAddress = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "555-555-5555",
  street1: "417 Montgomery Street",
  street2: "5th Floor",
  city: "San Francisco",
  state: "CA",
  postalCode: "94104",
  country: "US",
};
// demo label code
function DemoLabel() {
  return (
    <Label className="text-md text-center  w-full">
      DEMO: Use card number
      <br />
      <Label className="font-bold">5555 5555 5555 4444</Label>
      <br />
      with any future date and CVC
      <br />
      (note: address is verified)
      <br />
      view the order in the administrator dashboard after checkout.
    </Label>
  );
}
