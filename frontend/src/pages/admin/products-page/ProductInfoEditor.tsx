import React, { useEffect, useState } from "react";

// UI Components
import { Input, inputVariants, Label } from "@components/ui";

// Types
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
    <div className="flex flex-col flex-1 gap-md overflow-hidden p-0.5">
      {/* Name */}
      <Label className="flex-col gap-xs">
        Name
        <Input
          type="text"
          placeholder="Product Name"
          value={localProduct.name}
          onChange={(e) =>
            setLocalProduct((prev) => ({ ...prev, name: e.target.value }))
          }
          required
        />
      </Label>

      <div className="flex gap-md items-end justify-between">
        {/* Price */}
        <Label className="flex-col gap-xs text-center">
          Price
          <div className="relative">
            <Input
              type="number"
              className="w-32 text-center"
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
            />
          </div>
        </Label>

        {/* Discount */}
        <div className="flex-1 flex items-end">
          <Label className="flex-col gap-xs text-center">
            Discount
            <Input
              className="w-32 text-center"
              type="number"
              min={0}
              onFocus={(e) => e.target.select()}
              value={discountValue > 0 ? `${discountValue}` : ""}
              onChange={(e) => setDiscountValue(parseFloat(e.target.value))}
              step="0.01"
            />
          </Label>

          {/* Discount Type */}
          <select
            className={inputVariants({ className: "ml-2 w-10" })}
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
      <Label className="flex-col gap-xs">
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
      </Label>
    </div>
  );
};

export default ProductInfoEditor;
