import { useNavigate } from "react-router-dom";
import { useCart } from "@features/cart/useCart";
import { Button, TagBox } from "@components/ui";
import type { Product } from "shared/types";
import {
  getProductDiscountPercent,
  getProductFinalPrice,
  toMajorUnit,
} from "shared/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
    navigate(`/Product/${product.id}`);
  };

  const discountPercent = getProductDiscountPercent(product).toFixed(0) + "%";
  const discountLabel = "$" + toMajorUnit(product.price).toFixed(2);
  const priceLabel = toMajorUnit(getProductFinalPrice(product)).toFixed(2);

  return (
    <div
      className="overflow-hidden cursor-pointer transition-all duration-300 border rounded-lg shadow-sm hover:shadow-lg bg-surface hover:scale-[1.02]"
      onClick={handleCardClick}
    >
      {/* Image container with static height */}
      <div className="relative w-full h-60 overflow-hidden rounded-t-lg bg-surfaceAlt flex items-center justify-center">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0].preview}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-textSecondary">
            No Image Available
          </div>
        )}
        {/* Tags overlay */}
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-2 left-2 flex gap-1">
            {product.tags.map((tag, index) => (
              <TagBox
                className="h-8 text-lg"
                key={index}
                text={tag.name}
                color={tag.color || "accent"}
                textColor={tag.textColor || "#fff"}
              />
            ))}
            <TagBox
              className="h-8 text-lg bg-accent"
              key="discount"
              text={discountPercent + " OFF!"}
              color="accent"
              textColor="#fff"
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-md">
        <h3 className="text-xl font-semibold mb-2 whitespace-nowrap">
          {product.name}
        </h3>

        <div className="flex items-center justify-center gap-2">
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

        <Button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-primary text-white hover:bg-primaryDark"
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
