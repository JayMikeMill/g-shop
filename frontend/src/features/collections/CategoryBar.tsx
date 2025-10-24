import React from "react";
import type { Category } from "shared/types";
import { useNavigate } from "react-router-dom";
interface CategoryBarProps {
  categories: Category[];
  onCategoryClick?: (category: Category) => void;

  className?: string;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  categories,
  onCategoryClick,
  className = "",
}) => {
  const navigate = useNavigate();
  if (categories.length === 0) return null;
  return (
    <div
      className={`w-full bg-surface border-y flex flex-col justify-center py-4 px-2 ${className}`}
    >
      <h2 className="text-lg font-semibold">Categories</h2>
      <div className="w-full flex flex-wrap gap-6 justify-center items-center py-4 px-2">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col items-center gap-2 cursor-pointer"
            style={{ flex: "0 1 100px", maxWidth: "120px" }}
            onClick={() => onCategoryClick?.(cat)}
          >
            <div className="flex items-center justify-center w-16 h-16">
              <img
                src={cat.images?.preview ?? ""}
                alt={cat.name}
                className="object-contain w-full h-full"
                onClick={() => navigate(`/category/${cat.slug}`)}
              />
            </div>
            <span className="mt-2 text-sm text-center font-medium text-gray-700">
              {cat.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBar;
