import { useState } from "react";
import CheckoutForm from "../features/checkout/CheckoutForm";
import { useApi } from "@api";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const { placeOrder } = useApi().orders;

  const onSubmit = async (order: any, paymentMethod: any) => {
    setLoading(true);
    setMessage(null);
    placeOrder(paymentMethod, order)
      .then(() => {
        setMessage("Order placed successfully!");
      })
      .catch((error: unknown) => {
        console.error("Error placing order:", error);
        setMessage("Error placing order");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col flex-1 gap-lg max-w-[700px] p-sm mx-auto font-sans text-text">
      <CheckoutForm onSubmit={onSubmit} />

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
