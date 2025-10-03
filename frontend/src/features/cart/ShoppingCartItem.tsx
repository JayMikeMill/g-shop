// frontend/src/components/cart/ShoppingCartItem.tsx
import { Button, TagBox } from "@components/ui";
import type { CartItem } from "@features/cart/CartItem";
import { parseVariantOptions } from "@my-store/shared/types/Product";
import { Plus, Minus } from "lucide-react";
interface ShoppingCartItemProps {
  item: CartItem;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
}

export default function ShoppingCartItem({
  item,
  addToCart,
  removeFromCart,
}: ShoppingCartItemProps) {
  const imgSrc =
    item?.product?.images?.[0]?.thumbnail ||
    item?.product?.images?.[0]?.preview ||
    item?.product?.images?.[0]?.main ||
    "";

  const name = item?.product?.name ?? "Unknown Product";
  const selectedOptions = parseVariantOptions(item.variant);

  return (
    <div className="flex items-center gap-md border-b border-divider pb-sm">
      <img
        src={imgSrc}
        alt={name}
        className="w-16 h-16 object-cover rounded-card bg-surface"
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-text truncate">{name}</p>

        {selectedOptions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {selectedOptions.map((opt, idx) => (
              <TagBox
                key={idx}
                color="accent"
                textColor="primary-foreground"
                text={opt.value}
                className="rounded-full"
              />
            ))}
          </div>
        )}

        <p className="text-textSecondary">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center gap-xs">
        <Button
          variant={"flat"}
          className="rounded-full p-2"
          onClick={() => removeFromCart({ ...item, quantity: 1 })}
          aria-label={`Remove one ${name}`}
          type="button"
        >
          <Minus className="w-4 h-4" />
        </Button>
        <span className="text-text min-w-[2ch] text-center">
          {item.quantity}
        </span>
        <Button
          variant={"flat"}
          className="rounded-full p-2"
          onClick={() => addToCart({ ...item, quantity: 1 })}
          aria-label={`Add one ${name}`}
          type="button"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <p className="w-16 text-right text-text">
        ${(item.price * item.quantity).toFixed(2)}
      </p>
    </div>
  );
}
