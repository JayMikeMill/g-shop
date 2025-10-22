import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@components/ui";

interface ProductSearchBarProps {
  onSearch: (query: string) => void;
  onFocus: () => void;
}

const ProductSearchBar: React.FC<ProductSearchBarProps> = ({
  onSearch,
  onFocus,
}) => {
  const [query, setQuery] = useState("");

  return (
    <div className="relative w-full hidden md:flex">
      <Input
        type="text"
        placeholder={`Search Products...`}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
        onFocus={onFocus}
      />
      <Search
        className="text-primary absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
        size={20}
      />
    </div>
  );
};

export default ProductSearchBar;
