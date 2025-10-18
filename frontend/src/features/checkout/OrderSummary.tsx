// Cart state management
import { useCart } from "@features/cart/useCart";
import { parseVariantOptions, toMajorUnit } from "shared/utils";

export default function OrderSummary() {
  const { cart, totals } = useCart();

  if (cart.items?.length === 0) {
    return (
      <div className="surface-box mx-auto p-6 text-center">
        <p>Your order is empty.</p>
      </div>
    );
  }

  return (
    <div className="surface-box p-6 flex flex-col gap-4">
      <h3 className="text-center text-xl font-semibold mb-4">Order Summary</h3>

      <div className="flex flex-col gap-3">
        {cart.items?.map((item, index) => {
          const key = item?.variant?.id ?? item?.product?.id ?? index;

          const imgSrc =
            item?.product?.images?.[0]?.thumbnail ||
            item?.product?.images?.[0]?.preview ||
            item?.product?.images?.[0]?.main ||
            "";

          const name = item?.product?.name ?? "Unknown Product";
          const selectedOptions = item.variant
            ? parseVariantOptions(item.variant)
            : [];

          return (
            <div
              key={key}
              className="flex items-center gap-md border-b border-divider pb-sm"
            >
              <img
                src={imgSrc}
                alt={name}
                className="w-16 h-16 object-cover rounded-surface bg-surface"
              />

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-text truncate">{name}</p>

                {selectedOptions.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedOptions.map((opt, idx) => (
                      <span key={`${key}-opt-${idx}`} className="options-tag">
                        {opt.name}: {opt.value}
                      </span>
                    ))}
                  </div>
                )}

                <p className="text-textSecondary">
                  Price: ${toMajorUnit(item.price).toFixed(2)} × {item.quantity}{" "}
                  = ${toMajorUnit(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-md flex flex-col gap-sm text-right font-semibold text-text">
        <p>Total Items: {totals.items}</p>
        <p>Subtotal: ${toMajorUnit(totals.subtotal).toFixed(2)}</p>
      </div>
    </div>
  );
}
