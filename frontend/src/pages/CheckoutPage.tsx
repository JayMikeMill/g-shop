import { useState } from "react";
import CheckoutForm from "@features/checkout/CheckoutForm";
import { useCart, useApi, useNavigate } from "@app/hooks";
import { CircleSpinner } from "@components/ui";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { clear: clearCart } = useCart();
  const { placeOrder } = useApi().orders;

  const onSubmit = async (order: any, paymentMethod: any) => {
    setLoading(true);

    const { success, error } = await placeOrder(paymentMethod, order);

    if (success) {
      clearCart();
      navigate("/order-confirmation");
    } else {
      throw new Error(error || "Order placement failed");
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
    </div>
  );
}
