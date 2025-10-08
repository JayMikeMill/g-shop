import { useNavigate } from "react-router-dom";

// import { useCart } from "@features/cart/useCart";

import { TagBox } from "@components/ui";
import type { Product } from "@shared/types";
import { toMajorUnit } from "@shared/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  // const { addItem } = useCart();
  //
  // const handleAddToCart = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   addItem({
  //     product: product,
  //     quantity: 1,
  //     price: product.price,
  //   });
  // };

  const handleCardClick = () => {
    navigate(`/Product/${product.id}`);
  };

  // Format discount label
  const discountLabel =
    (product.discount ? (toMajorUnit(product.discount) ?? "0") : "0") +
    (product.discountType === "PERCENTAGE" ? "%" : "$");

  return (
    <div
      className="overflow-hidden cursor-pointer transition-all duration-300"
      onClick={handleCardClick}
    >
      <div className="relative w-full pt-[100%]">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0].preview}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-card"
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-surfaceAlt text-textSecondary rounded-card">
            No Image Available
          </div>
        )}
        {product.tags && product.tags.length > 0 && (
          <div className="absolute top-2 left-2 flex gap-1">
            {product.tags.map((tag, index) => (
              <TagBox
                key={index}
                text={tag.name}
                color={tag.color ? tag.color : "accent"}
                textColor={tag.textColor ? tag.textColor : "#fff"}
              />
            ))}
          </div>
        )}
      </div>

      <div className="p-md ">
        <h3 className="text-base font-semibold mb-2 text-text">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 justify-center">
          {discountLabel}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
