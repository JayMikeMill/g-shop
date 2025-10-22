import React from "react";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div
      className={`overflow-hidden border rounded-lg shadow-sm bg-surface animate-pulse`}
    >
      {/* Image placeholder */}
      <div className="relative w-full pt-[100%] bg-surfaceAlt rounded-t-lg">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-300 rounded-t-lg"></div>
      </div>

      {/* Content placeholder */}
      <div className="p-md">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="flex gap-2 mb-4">
          <div className="h-5 bg-gray-300 rounded w-16"></div>
          <div className="h-5 bg-gray-300 rounded w-12"></div>
        </div>

        {/* Button placeholder */}
        <div className="h-10 w-full bg-gray-400 rounded"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
