import React, { useState, useEffect } from "react";
import { useDataApi } from "@api";
import ProductSearchBar from "@features/product-search/ProductSearchBar";
import ProductSearchOverlay from "@features/product-search/ProductSearchOverlay";
import { Search } from "lucide-react";

interface ProductSearchProps {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ProductSearch: React.FC<ProductSearchProps> = ({
  open,
  onOpen,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { products: productsApi } = useDataApi();
  const { data: searchData, isLoading: searchLoading } = productsApi.getMany(
    searchQuery
      ? {
          search: searchQuery,
          searchFields: ["name", "description"],
          include: ["tags", "images"],
          limit: 12,
        }
      : undefined
  );
  const searchProducts = searchData?.data ?? [];

  // Disable website scrolling when search panel is open on mobile
  useEffect(() => {
    if (open && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Toggle search panel when search button is clicked
  const handleSearchButtonClick = () => {
    if (open) {
      onClose();
    } else {
      onOpen();
    }
  };

  return (
    <>
      <ProductSearchBar onSearch={setSearchQuery} onFocus={onOpen} />
      <Search
        className="text-primary md:hidden flex items-center justify-center w-8 h-8 rounded-full"
        size={12}
        onClick={handleSearchButtonClick}
      />
      <ProductSearchOverlay
        open={open}
        query={searchQuery}
        products={searchProducts}
        onClose={onClose}
        onMobileSearch={setSearchQuery}
        isLoading={searchLoading}
      />
    </>
  );
};

export default ProductSearch;
