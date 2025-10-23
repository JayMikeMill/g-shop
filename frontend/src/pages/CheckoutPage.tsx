import { useState } from "react";
import CheckoutForm from "@features/checkout/CheckoutForm";
import { useCart, useApi, useNavigate } from "@app/hooks";
import { CircleSpinner } from "@components/ui";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const { clear: clearCart } = useCart();
  const { placeOrder } = useApi().orders;

  const onSubmit = async (order: any, paymentMethod: any) => {
    setLoading(true);
    setMessage(null);

    const { success, error } = await placeOrder(paymentMethod, order);

    if (success) {
      clearCart();
      setMessage("Order placed successfully!");
      navigate("/order-confirmation");
    } else {
      setMessage("Error placing order" + error!);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col flex-1 gap-lg max-w-[700px] p-sm mx-auto font-sans text-text">
      <CheckoutForm onSubmit={onSubmit} />

      {loading && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30">
          <CircleSpinner text={`Processing payment...`} />
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
