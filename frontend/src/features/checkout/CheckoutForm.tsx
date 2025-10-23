import { useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";

import type { Order, ShippingInfo } from "shared/types";

import { useCart } from "@app/hooks";
import { createOrder } from "./createOrder";

//import { zodResolver } from "@hookform/resolvers/zod";
import { type CheckoutFormType } from "./CheckoutSchema";

import { Button } from "@components/ui";
import ShippingForm from "./ShippingForm";
import OrderSummary from "./OrderSummary";
import StripePaymentForm from "./PaymentFormStripe";
import type { StripePaymentFormHandle } from "./PaymentFormStripe";
import { Label } from "@radix-ui/react-label";

interface CheckoutFormProps {
  onSubmit: (order: Order, paymentMethod: any) => void;
}
export default function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const { cart } = useCart();

  const methods = useForm<CheckoutFormType>({
    defaultValues: {
      shippingInfo: {
        address: {},
      },
      paymentMethod: {},
    },
    mode: "onChange",
  });

  const stripeFormRef = useRef<StripePaymentFormHandle>(null);

  const handleSubmit = async (data: CheckoutFormType) => {
    console.log("Checking out with data:", data);

    try {
      const newOrder = await createOrder(
        cart,
        data.shippingInfo as ShippingInfo
      );

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

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="flex flex-col gap-lg"
      >
        <div className="bg-surface p-md rounded-md shadow-md">
          <OrderSummary />
        </div>
        <div className="flex flex-col bg-surface p-md gap-lg rounded-md shadow-md">
          <Label className="text-xl text-center font-semibold w-full">
            Shipping Information
          </Label>
          <ShippingForm />
        </div>
        <StripePaymentForm formRef={stripeFormRef} />
        <Button type="submit" className="btn btn-primary mt-4">
          Place Order
        </Button>
      </form>
    </FormProvider>
  );
}
