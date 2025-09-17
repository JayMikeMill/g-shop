import { useState, useEffect } from "react";
import { useCart } from "@contexts/cart-context";
import { type ShippingInfo } from "@models/shipping-info";
import ShippingForm from "@components/forms/shipping-form";
import PaymentFormSquare from "@components/forms/payment-forms/payment-form-square";
import OrderPreview from "@components/order-preview";

export default function CheckoutPage() {
  const { cart: cartItems } = useCart();
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
    method: "standard",
    carrier: "UPS",
    trackingNumber: null,
    cost: 0,
    notes: "",
  });

  const [shippingCost, setShippingCost] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(subtotal + shippingCost);
  }, [cartItems, shippingCost]);

  useEffect(() => {
    setShippingCost(shippingInfo.address.postalCode ? 5 : 0);
  }, [shippingInfo]);

  return (
    <div className="max-w-[700px] mx-auto mt-xl p-lg bg-card-bg rounded border-radius shadow-card font-sans text-text relative">
      <h2 className="text-2xl text-center mb-lg text-title">Checkout</h2>

      <OrderPreview />

      <ShippingForm
        shippingInfo={shippingInfo}
        setShippingInfo={setShippingInfo}
      />

      <PaymentFormSquare
        total={total}
        orderItems={cartItems}
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
