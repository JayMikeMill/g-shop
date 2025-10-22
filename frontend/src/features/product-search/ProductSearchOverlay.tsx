import React from "react";
import ProductCardList from "@features/products/ProductCardList";
import type { Product } from "shared/types";
import { Input, XButton } from "@components/ui";
import { Search } from "lucide-react";

interface ProductSearchPanelProps {
  open: boolean;
  query: string;
  products: Product[];
  onClose: () => void;
  onMobileSearch?: (query: string) => void;
  isLoading?: boolean;
}

const ProductSearchOverlay: React.FC<ProductSearchPanelProps> = ({
  open,
  query,
  products,
  onClose,
  onMobileSearch,
  isLoading,
}) => {
  if (!open) return null;

  const foundProducts = products.length > 0;

  return (
    <div className="absolute left-0 right-0 top-full w-full z-20">
      {/* Mobile search bar: only visible on mobile, full width, above results */}

      <div className="flex flex-row  md:hidden w-full bg-white px-4 py-3 flex items-center">
        <div className="relative w-full">
          <Input
            placeholder="Search products..."
            value={query}
            onChange={(e) => onMobileSearch?.(e.target.value)}
          />
          <Search
            className="text-primary absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            size={20}
          />
        </div>
        <XButton
          className="ml-2 text-gray-500 hover:bg-transparent"
          onClick={onClose}
        />
      </div>
      <div
        className="bg-surface shadow-lg rounded-b w-full max-w-full mx-auto flex flex-col gap-md"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-2 md:flex">
            <span className="font-semibold text-lg">Search Results</span>
          </div>
          {isLoading || foundProducts ? (
            <ProductCardList
              products={products}
              isLoading={isLoading ?? false}
              showAddToCartButton={false}
              onProductClick={onClose}
            />
          ) : !foundProducts ? (
            <div className="text-gray-400 text-center py-8">
              No products found.
            </div>
          ) : (
            <div className="text-gray-400 text-center py-8">
              Type to search products...
            </div>
          )}
        </div>
        {/* Pagination controls will be added here when implemented */}
      </div>
    </div>
  );
};

export default ProductSearchOverlay;
