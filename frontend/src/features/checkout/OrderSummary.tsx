// Cart state management
import { useCart } from "@app/hooks";
import CartContents from "@features/cart/CartContents";

export default function OrderSummary() {
  const { cart } = useCart();

  if (cart.items?.length === 0) {
    return (
      <div className="mx-auto text-center">
        <p>Your order is empty.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 bg-surface">
      <h3 className="text-center text-xl font-semibold">Order Summary</h3>
      <CartContents isSummary />
    </div>
  );
}
