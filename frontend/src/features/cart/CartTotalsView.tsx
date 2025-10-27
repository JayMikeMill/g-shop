import { toMajorUnit } from "shared/utils";
import { useCart } from "@app/hooks";
// import { useSiteSettings } from "@app/hooks";

export interface CartTotalsViewProps {
  showTax?: boolean;
  className?: string;
}

export default function CartTotalsView({
  showTax = false,
  className,
}: CartTotalsViewProps) {
  const { cartTotals } = useCart();
  // const { siteSettings } = useSiteSettings();

  const freeShipping = cartTotals.shipping === 0;

  return (
    <div className={`flex flex-col bg-surface p-md ${className ?? ""}`}>
      <div className="flex justify-between font-semibold text-text">
        <span>Subtotal</span>
        <span>${toMajorUnit(cartTotals.subtotal).toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-semibold text-textSecondary">
        <span>Shipping</span>
        <span className={`${freeShipping ? "font-bold text-green-700" : ""}`}>
          {freeShipping ? "FREE!" : toMajorUnit(cartTotals.shipping).toFixed(2)}
        </span>
      </div>
      {showTax && cartTotals.tax > 0 && (
        <div className="flex justify-between font-semibold text-textSecondary">
          <span>
            Sales Tax {/*({toMajorUnit(siteSettings?.taxRate ?? 0)}%)*/}
          </span>
          <span>${toMajorUnit(cartTotals.tax).toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between font-bold text-xl text-text">
        <span>Total</span>
        <span>
          $
          {toMajorUnit(
            showTax
              ? cartTotals.total
              : cartTotals.subtotal + cartTotals.shipping
          ).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
