import { Image, Label, Button, TagBox } from "@components/ui";
import { Minus, Plus, Trash2 } from "lucide-react";
import { parseVariantOptions, toMajorUnit } from "shared/utils";
import type { CartItem as CartItemViewType } from "shared/types";

interface CartItemViewProps {
  item: CartItemViewType;
  addToCart?: (item: CartItemViewType) => void;
  removeFromCart?: (item: CartItemViewType) => void;
  removeCompletely?: (item: CartItemViewType) => void;
  readOnly?: boolean;
  onProductClick?: (productId?: string) => void;
  className?: string;
}

export default function CartItemView({
  item,
  addToCart,
  removeFromCart,
  removeCompletely,
  readOnly = false,
  onProductClick,
  className,
}: CartItemViewProps) {
  const imgSrc =
    item.product?.images?.[0]?.thumbnail ??
    item.product?.images?.[0]?.preview ??
    item.product?.images?.[0]?.main ??
    "";

  const name = item.product?.name ?? "Unknown Product";
  const selectedOptions = item.variant ? parseVariantOptions(item.variant) : [];
  const ogPrice = item.product?.price! * item.quantity;
  const finalPrice = item.price * item.quantity;
  return (
    <div className={`flex flex-row items-center py-md relative ${className}`}>
      {/* Trash can icon for removing item completely (not in readOnly mode) */}
      {!readOnly && removeCompletely && (
        <Button
          variant="bare"
          className="absolute top-0 right-0 p-1"
          onClick={() => removeCompletely(item)}
          aria-label={`Remove ${name} from cart`}
        >
          <Trash2 className="w-5 h-5 text-destructive" />
        </Button>
      )}
      {/* Item image */}
      <Image
        src={imgSrc}
        alt={name}
        className="w-20 h-20 rounded-md bg-transparent object-contain"
        onClick={() => (onProductClick ? onProductClick(item.productId) : null)}
      />

      <div className="flex flex-1 flex-col justify-center items-center sm:flex-row sm:gap-md sm:px-md ">
        {/* Item name and variant options */}
        <div className="flex flex-1 flex-col">
          <p className="font-semibold text-center">{name}</p>
          {selectedOptions.length > 0 && (
            <div className="flex flex-wrap gap-1 justify-center">
              {selectedOptions.map((opt, idx) => (
                <Label key={idx}>{`${opt.name}: ${opt.value}`}</Label>
              ))}
            </div>
          )}
        </div>

        {/* Quantity controls or read-only quantity */}
        {!readOnly ? (
          <div className="flex flex-row items-center border h-9">
            <Button
              variant="bare"
              className="flex items-center justify-center rounded-none border-none trasnsition-colors"
              onClick={() => removeFromCart?.({ ...item, quantity: 1 })}
              aria-label={`Remove one ${name}`}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="flex-none justify-center text-center">
              {item.quantity}
            </span>
            <Button
              variant="bare"
              className="flex items-center justify-center rounded-none border-none trasnsition-colors"
              onClick={() => addToCart?.({ ...item, quantity: 1 })}
              aria-label={`Add one ${name}`}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-row items-center h-9">
            <span className="flex-none justify-center text-center text-lg font-semibold px-2">
              {`$${toMajorUnit(item.product?.price ?? 0).toFixed(2)} x ${item.quantity}`}
            </span>
          </div>
        )}
      </div>

      {/* Item total price */}
      <div className="flex  flex-col items-center">
        <div className="flex flex-col sm:flex-row items-center sm:gap-sm">
          <p className="text-md text-muted w-16 text-center line-through">
            ${toMajorUnit(ogPrice).toFixed(2)}
          </p>
          <p className="text-lg font-semibold text-center w-16 pl-0">
            ${toMajorUnit(finalPrice).toFixed(2)}
          </p>
        </div>

        <TagBox
          className="h-6 text-sm bg-accent text-foreground"
          text={`SAVE $${toMajorUnit(ogPrice - finalPrice).toFixed(2)}`}
        />
      </div>
    </div>
  );
}
