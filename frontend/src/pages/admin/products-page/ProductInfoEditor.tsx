import React, { useEffect, useState } from "react";

// UI Components
import {
  Input,
  inputVariants,
  Label,
  NumberInput,
  Textarea,
} from "@components/ui";

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

      <div className="flex gap-md justify-left">
        {/* Price */}
        <Label className="flex-col gap-xs  w-32">
          Price
          <NumberInput
            symbol="$"
            onFocus={(e) => e.target.select()}
            value={priceToFloat(localProduct.price)}
            onChange={(e) =>
              setLocalProduct((prev) => ({
                ...prev,
                price: floatToPrice(parseFloat(e.target.value)),
              }))
            }
            required
          />
        </Label>

        {/* Discount */}
        <div className="flex items-end gap-sm">
          <Label className="flex-col gap-xs">
            Discount
            <NumberInput
              symbol={discountType}
              className="text-center  w-32"
              onFocus={(e) => e.target.select()}
              value={discountValue > 0 ? `${discountValue}` : ""}
              onChange={(e) => setDiscountValue(parseFloat(e.target.value))}
              step={discountType === "$" ? "0.01" : "1"}
            />
          </Label>

          {/* Discount Type */}
          <select
            className={inputVariants({ className: "w-10" })}
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
        <Textarea
          value={localProduct.description}
          placeholder="Product Description"
          onChange={(e) =>
            setLocalProduct((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
          required
          className="px-md py-1 h-40 resize-none"
        />
      </Label>
    </div>
  );
};

export default ProductInfoEditor;
