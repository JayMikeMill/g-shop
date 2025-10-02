import { useState, useEffect } from "react";

// Cart state management
import { useAppSelector } from "@app/hooks";
import { selectCart } from "@features/cart/cartSlice";

import { type ShippingInfo } from "@shared/types/Shipping";

import OrderSummary from "../features/checkout/OrderSummary";
import ShippingForm from "../features/checkout/ShippingForm";

//import PaymentFormSquare from "./payment-forms/PaymentFormSquare";
import PaymentFormStripe from "../features/checkout/PaymentFormStripe";

export default function CheckoutPage() {
  const cart = useAppSelector(selectCart);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: "",
    address: {
      firstName: "",
      lastName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US",
    },
    email: "",
    phone: "",
    method: "STANDARD",
    carrier: "UPS",
    trackingNumber: null,
    cost: 0,
    notes: "",
  });

  const [shippingCost, setShippingCost] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(subtotal + shippingCost);
  }, [cart, shippingCost]);

  useEffect(() => {
    setShippingCost(shippingInfo.address.postalCode ? 5 : 0);
  }, [shippingInfo.address.postalCode]);

  return (
    <div className="flex flex-col flex-1 gap-lg max-w-[700px] p-sm mx-auto font-sans text-text">
      <OrderSummary />

      <ShippingForm
        className="p-4"
        defaultValues={shippingInfo}
        onChange={setShippingInfo}
      />

      <PaymentFormStripe
        total={total}
        cartItems={cart}
        shippingInfo={shippingInfo}
        setLoading={setLoading}
        setMessage={setMessage}
      />

      {loading && (
        <div className="fixed inset-0 bg-overlay flex flex-col items-center justify-center z-[9999] text-text-on-overlay text-lg">
          <div className="w-15 h-15 border-8 border-border border-t-8 border-t-primary rounded-full animate-spin mb-md"></div>
          <span>Processing payment...</span>
        </div>
      )}

      {message && (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
						bg-primary text-primary-foreground px-xl py-lg rounded shadow-md z-[10000] text-center text-lg"
        >
          {message}
        </div>
      )}
    </div>
  );
}
