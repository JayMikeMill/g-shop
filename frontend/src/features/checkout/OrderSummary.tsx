// Cart state management
import CartContents from "@features/cart/CartContents";

export default function OrderSummary() {
  return (
    <div className="flex flex-col gap-4 bg-surface">
      <h3 className="text-center text-xl font-semibold">Order Summary</h3>
      <CartContents isSummary />
    </div>
  );
}
