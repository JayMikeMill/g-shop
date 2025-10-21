// ProductPageSkeleton.tsx
import React from "react";

export const ProductPageSkeleton: React.FC = () => {
  return (
    <div className="p-md animate-pulse">
      <div className="flex flex-col md:flex-row justify-center md:items-start pb-2">
        {/* Mobile title + price */}
        <div className="flex flex-col gap-2 md:hidden items-center w-full px-4 mb-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="flex items-center justify-center gap-3 py-2">
            <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Image viewer skeleton */}
        <div className="w-full md:w-auto flex justify-center pb-md">
          <div className="flex flex-col items-center">
            <div className="w-80 h-80 bg-gray-300 dark:bg-gray-700 rounded-lg mb-md"></div>
            <div className="flex justify-center gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-md"
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Product details skeleton */}
        <div className="flex flex-col gap-4 w-full md:w-auto text-left self-start px-md">
          {/* Title + Price */}
          <div className="hidden md:flex flex-col gap-2">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="flex items-center gap-3 py-2">
              <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Variant selector mock */}
          <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded-md"></div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"
              ></div>
            ))}
          </div>

          {/* Description */}
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"
              ></div>
            ))}
          </div>

          {/* Add to cart button */}
          <div className="flex justify-center mt-4">
            <div className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
