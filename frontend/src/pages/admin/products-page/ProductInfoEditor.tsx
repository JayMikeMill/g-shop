import React, { useEffect, useState } from "react";
import {
  type Product,
  emptyProduct,
  priceToFloat,
  floatToPrice,
} from "@shared/types/Product";

interface ProductInfoEditorProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  openInitially?: boolean; // control visibility
}

const ProductInfoEditor: React.FC<ProductInfoEditorProps> = ({
  product,
  setProduct,
}) => {
  const [localProduct, setLocalProduct] = useState<Product>(emptyProduct);
  const [discountValue, setDiscountValue] = useState(0);
  const [discountType, setDiscountType] = useState<"%" | "$">("%");

  useEffect(() => {
    setLocalProduct(product);

    // Sync local options with product
    if (product.discount) {
      if (product.discount.includes("%")) {
        setDiscountType("%");
        setDiscountValue(parseFloat(product.discount.replace("%", "")));
      } else {
        setDiscountType("$");
        setDiscountValue(parseFloat(product.discount));
      }
    } else {
      setDiscountType("%");
      setDiscountValue(0);
    }
  }, [product.id]);

  // Push changes to product
  useEffect(() => {
    setProduct((prev) => ({
      ...prev,
      name: localProduct.name,
      price: localProduct.price,
      discount: discountValue > 0 ? `${discountValue}${discountType}` : "$0",
      description: localProduct.description,
    }));
  }, [
    setProduct,
    localProduct.name,
    localProduct.price,
    discountValue,
    discountType,
    localProduct.description,
  ]);

  return (
    <div className="flex flex-col flex-1 gap-2 overflow-hidden">
      {/* Name */}
      <label className="flex flex-col text-sm font-semibold text-textSecondary">
        Name
        <input
          type="text"
          placeholder="Product Name"
          value={localProduct.name}
          onChange={(e) =>
            setLocalProduct((prev) => ({ ...prev, name: e.target.value }))
          }
          required
          className="input-box px-md py-1 h-8 text-text"
        />
      </label>

      <div className="flex gap-md items-end">
        {/* Price */}
        <label className="flex-1 flex flex-col text-sm font-semibold text-textSecondary">
          Price
          <div className="relative">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-textSecondary">
              $
            </span>
            <input
              type="number"
              min={0}
              onFocus={(e) => e.target.select()}
              value={priceToFloat(localProduct.price)}
              onChange={(e) =>
                setLocalProduct((prev) => ({
                  ...prev,
                  price: floatToPrice(parseFloat(e.target.value)),
                }))
              }
              required
              step="0.01"
              className="input-box pl-6 pr-md py-1 h-8 w-full"
            />
          </div>
        </label>

        {/* Discount */}
        <div className="flex-1 flex items-end">
          <label className="flex-1 flex flex-col text-sm font-semibold text-textSecondary">
            Discount
            <div className="relative">
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-textSecondary">
                {discountType}
              </span>
              <input
                type="number"
                min={0}
                onFocus={(e) => e.target.select()}
                className="input-box pl-6 pr-md py-1 h-8 w-full"
                value={discountValue > 0 ? `${discountValue}` : ""}
                onChange={(e) => setDiscountValue(parseFloat(e.target.value))}
                step="0.01"
              />
            </div>
          </label>

          {/* Discount Type */}
          <select
            className="input-box ml-1 px-2 py-1 h-8"
            value={discountType}
            onChange={(e) => setDiscountType(e.target.value as "%" | "$")}
          >
            <option value="%" className="text-center">
              %
            </option>
            <option value="$" className="text-center">
              $
            </option>
          </select>
        </div>
      </div>

      {/* Description */}
      <label className="pb-0.5 flex flex-col text-sm font-semibold text-textSecondary">
        Description
        <textarea
          value={localProduct.description}
          placeholder="Product Description"
          onChange={(e) =>
            setLocalProduct((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          required
          className="input-box px-md py-1 h-40 resize-none"
        />
      </label>
    </div>
  );
};

export default ProductInfoEditor;
