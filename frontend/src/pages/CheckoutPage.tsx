import { useState, useEffect } from "react";

import OrderSummary from "../features/checkout/OrderSummary";
import ShippingForm from "../features/checkout/ShippingForm";
import PaymentFormStripe from "../features/checkout/PaymentFormStripe";
import { useCart } from "@features/cart/useCart";
import { emptyShippingInfo } from "@shared/types";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [shippingInfo, setShippingInfo] = useState(emptyShippingInfo);

  const [shippingCost, setShippingCost] = useState(0);
  const { cart } = useCart();

  useEffect(() => {
    setShippingCost(shippingInfo.address?.postalCode ? 5 : 0);
    shippingCost;
  }, [shippingInfo.address?.postalCode]);

  return (
    <div className="flex flex-col flex-1 gap-lg max-w-[700px] p-sm mx-auto font-sans text-text">
      <OrderSummary />

      <ShippingForm
        className="p-4"
        defaultValues={shippingInfo}
        onChange={setShippingInfo}
      />

      <PaymentFormStripe
        cart={cart}
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
