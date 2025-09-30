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

  const [localDimensions, setLocalDimensions] = useState<ProductDimensions>(
    product.dimensions
  );

  // Generate variants when options change
  useEffect(() => {
    setLocalDimensions(product.dimensions);
  }, [product.id]);

  // Push local dimensions back into product whenever they change
  useEffect(() => {
    setProduct((prev) => ({
      ...prev,
      dimensions: localDimensions,
    }));
  }, [localDimensions, setProduct]);

  const setDimension = (key: keyof ProductDimensions, value: string) => {
    setLocalDimensions((prev) => ({
      ...prev,
      [key]: value === "" ? undefined : parseFloat(value),
    }));
  };

  const weightPrefix = system === "imperial" ? "oz" : "gm";
  const sizePrefix = system === "imperial" ? "in" : "cm";

  const inputClass = "input-box h-8 w-full text-center";
  const labelClass =
    "flex-1 flex flex-col gap-1 font-semibold text-textSecondary text-center";
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
            placeholder="-"
            value={localDimensions?.weight_grams ?? ""}
            onChange={(e) => setDimension("weight_grams", e.target.value)}
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
            placeholder="-"
            value={localDimensions?.length_cm ?? ""}
            onChange={(e) => setDimension("length_cm", e.target.value)}
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
            placeholder="-"
            value={localDimensions?.width_cm ?? ""}
            onChange={(e) => setDimension("width_cm", e.target.value)}
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
            placeholder="-"
            value={localDimensions?.height_cm ?? ""}
            onChange={(e) => setDimension("height_cm", e.target.value)}
            className={inputClass}
          />
        </div>
      </label>
    </div>
  );
};

export default ProductDimensionsEditor;
