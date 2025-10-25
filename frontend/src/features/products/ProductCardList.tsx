import ProductCardSkeleton from "./ProductCardSkeleton";
import ProductCard from "./ProductCard";
import type { Product } from "shared/types";

interface ProductCardListProps {
  products: Product[];
  isLoading: boolean;
  showAddToCartButton?: boolean;
  onProductClick?: () => void;
  horizontal?: boolean;
  className?: string;
  randomize?: boolean;
}

export default function ProductCardList({
  products,
  isLoading,
  showAddToCartButton = true,
  onProductClick,
  horizontal = false,
  className,
  randomize = false,
}: ProductCardListProps) {
  // Shuffle products if randomize is true
  const displayProducts = randomize
    ? [...products].sort(() => Math.random() - 0.5)
    : products;
  if (horizontal) {
    return (
      <div
        className={`flex gap-sm py-md sm:gap-md px-sm sm:px-md overflow-x-auto overflow-y-hidden ${className} scrollbar-hide`}
      >
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="aspect-[4/5] min-w-[180px] max-w-[220px] flex-shrink-0"
              >
                <ProductCardSkeleton />
              </div>
            ))
          : displayProducts.map((p) => (
              <div
                key={p.id}
                className="aspect-[4/5] min-w-[180px] max-w-[220px] flex-shrink-0"
              >
                <ProductCard
                  product={p}
                  showAddToCartButton={showAddToCartButton}
                  onProductClick={onProductClick}
                />
              </div>
            ))}
      </div>
    );
  }
  return (
    <div
      className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-sm sm:gap-md lg:gap-lg px-sm sm:px-md ${className}`}
    >
      {isLoading
        ? Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="aspect-[4/5]">
              <ProductCardSkeleton />
            </div>
          ))
        : displayProducts.map((p) => (
            <div key={p.id} className="aspect-[4/5]">
              <ProductCard
                product={p}
                showAddToCartButton={showAddToCartButton}
                onProductClick={onProductClick}
              />
            </div>
          ))}
    </div>
  );
}
