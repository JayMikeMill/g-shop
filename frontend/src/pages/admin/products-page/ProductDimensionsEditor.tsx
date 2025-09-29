import React, { useEffect, useState } from "react";
import { type Product, type ProductDimensions } from "@shared/types/Product";

interface ProductDimensionsEditorProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

export const ProductDimensionsEditor: React.FC<
  ProductDimensionsEditorProps
> = ({ product, setProduct }) => {
  const system = "imperial" as "imperial" | "metric"; // Future: allow user to select

  const [localDimensions, setLocalDimensions] = useState<
    ProductDimensions | undefined
  >();

  // Generate variants when options change
  useEffect(() => {
    setLocalDimensions(product.dimensions);
  }, [product.id]);

  // Push local dimensionsq back into product whenever they change
  useEffect(() => {
    setProduct((prev) => ({
      ...prev,
      dimensions: localDimensions,
    }));
  }, [localDimensions, setProduct]);

  const weightPrefix = system === "imperial" ? "oz" : "gm";
  const sizePrefix = system === "imperial" ? "in" : "cm";

  const inputClass = "input-box px-md pr-md py-1 h-8 w-full text-center";
  const labelClass =
    "flex-1 flex flex-col gap-1 text-xs font-semibold text-textSecondary text-center";
  return (
    <div className="flex gap-md items-end">
      {/* Weight */}
      <label className={labelClass}>
        {"Weight (" + weightPrefix + ")"}
        <div className="relative">
          <input
            type="number"
            min={0}
            onFocus={(e) => e.target.select()}
            value={localDimensions?.weight_grams ?? "0"}
            onChange={(e) =>
              setLocalDimensions((prev) => ({
                ...prev,
                weight_grams: parseFloat(e.target.value),
              }))
            }
            className={inputClass}
          />
        </div>
      </label>

      {/* Length */}
      <label className={labelClass}>
        {"Length (" + sizePrefix + ")"}
        <div className="relative">
          <input
            type="number"
            min={0}
            onFocus={(e) => e.target.select()}
            value={localDimensions?.length_cm ?? "0"}
            onChange={(e) =>
              setLocalDimensions((prev) => ({
                ...prev,
                length_cm: parseFloat(e.target.value),
              }))
            }
            className={inputClass}
          />
        </div>
      </label>
      {/* Width */}
      <label className={labelClass}>
        {"Width (" + sizePrefix + ")"}
        <div className="relative">
          <input
            type="number"
            min={0}
            onFocus={(e) => e.target.select()}
            value={localDimensions?.width_cm ?? "0"}
            onChange={(e) =>
              setLocalDimensions((prev) => ({
                ...prev,
                width_cm: parseFloat(e.target.value),
              }))
            }
            className={inputClass}
          />
        </div>
      </label>
      {/* Height */}
      <label className={labelClass}>
        {"Height (" + sizePrefix + ")"}
        <div className="relative">
          <input
            type="number"
            min={0}
            onFocus={(e) => e.target.select()}
            value={localDimensions?.height_cm ?? "0"}
            onChange={(e) =>
              setLocalDimensions((prev) => ({
                ...prev,
                height_cm: parseFloat(e.target.value),
              }))
            }
            className={inputClass}
          />
        </div>
      </label>
    </div>
  );
};

export default ProductDimensionsEditor;
