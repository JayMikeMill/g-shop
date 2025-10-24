import { useCart, useNavigate } from "@app/hooks";
import { Button, TagBox } from "@components/ui";
import type { Product } from "shared/types";
import {
  getProductDiscountPercent,
  getProductFinalPrice,
  toMajorUnit,
} from "shared/utils";

interface ProductCardProps {
  product: Product;
  showAddToCartButton?: boolean;
  onProductClick?: () => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showAddToCartButton = true,
  onProductClick,
  className,
}) => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      productId: product.id,
      product: product,
      quantity: 1,
      price: product.price,
    });
  };

  const handleCardClick = () => {
    if (onProductClick) onProductClick();
    navigate(`/Product/${product.id}`);
  };

  const discountPercent = getProductDiscountPercent(product).toFixed(0) + "%";
  const discountLabel = "$" + toMajorUnit(product.price).toFixed(2);
  const priceLabel = toMajorUnit(getProductFinalPrice(product)).toFixed(2);

  return (
    <div
      className={`flex flex-col overflow-hidden cursor-pointer transition-all duration-300 border rounded-lg shadow-sm hover:shadow-lg bg-surface hover:scale-[1.02] ${className}`}
      style={{ minWidth: 0 }}
      onClick={handleCardClick}
    >
      {/* Image container with aspect ratio, always contains image */}
      <div className="relative flex items-center justify-center aspect-square overflow-hidden rounded-t-lg bg-surfaceAlt w-full">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0].preview}
            alt={product.name}
            className="w-full h-full object-contain"
            style={{ minWidth: 0, minHeight: 0 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-textSecondary">
            No Image Available
          </div>
        )}
        {/* Tags overlay */}
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
            {product.tags.map((tag, index) => (
              <TagBox
                className="h-6 text-md font-normal whitespace-nowrap"
                key={index}
                text={tag.name}
                color={tag.color || "accent"}
                textColor={tag.textColor || "#fff"}
              />
            ))}
            <TagBox
              className="h-6 text-md font-normal bg-accent whitespace-nowrap"
              key="discount"
              text={discountPercent + " OFF!"}
              color="accent"
              textColor="#fff"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col p-md flex-1 min-h-0">
        <h3
          className="text-md  text-left .font-semibold line-clamp-2"
          style={{ minHeight: "2.5rem" }}
        >
          {product.name}
        </h3>

        <div className="flex gap-2 items-center">
          {product.discount ? (
            <>
              <span className="text-md text-muted line-through">
                {discountLabel}
              </span>
              <span className="text-lg font-bold">${priceLabel}</span>
            </>
          ) : (
            <span className="text-lg font-bold">${priceLabel}</span>
          )}
        </div>

        {showAddToCartButton && (
          <Button
            onClick={handleAddToCart}
            className="mt-4 w-full bg-primary text-white hover:bg-primaryDark"
          >
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
