import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductCard from "./ProductCard";
import type { Product } from "shared/types";

interface ProductCardListProps {
  products: Product[];
  isLoading: boolean;
  showAddToCartButton?: boolean;
  onProductClick?: () => void;
}

export default function ProductCardList({
  products,
  isLoading,
  showAddToCartButton = true,
  onProductClick,
}: ProductCardListProps) {
  return (
    <div className="grid grid-cols-2 gap-sm sm:gap-md sm:grid-cols-3 lg:grid-cols-4 lg:gap-lg px-sm sm:px-md">
      {isLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        : products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              showAddToCartButton={showAddToCartButton}
              onProductClick={onProductClick}
            />
          ))}
    </div>
  );
}
