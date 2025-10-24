import { toMajorUnit } from "shared/utils";
import { useCart } from "@app/hooks";

export interface CartTotalsViewProps {
  showTax?: boolean;
  className?: string;
}

export default function CartTotalsView({
  showTax = false,
  className,
}: CartTotalsViewProps) {
  const { totals } = useCart();

  const freeShipping = totals.shipping === 0;

  return (
    <div className={`flex flex-col bg-surface p-md ${className ?? ""}`}>
      <div className="flex justify-between font-semibold text-text">
        <span>Subtotal</span>
        <span>${toMajorUnit(totals.subtotal).toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-semibold text-textSecondary">
        <span>Shipping</span>
        <span className={`${freeShipping ? "font-bold text-green-700" : ""}`}>
          {freeShipping ? "FREE!" : toMajorUnit(totals.shipping).toFixed(2)}
        </span>
      </div>
      {showTax && (
        <div className="flex justify-between font-semibold text-textSecondary">
          <span>Tax</span>
          <span>${toMajorUnit(totals.tax).toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between font-bold text-xl text-text">
        <span>Total</span>
        <span>
          $
          {toMajorUnit(
            showTax ? totals.total : totals.subtotal + totals.shipping
          ).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
