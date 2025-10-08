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
import { type Product, emptyProduct } from "@shared/types";
import { toMajorUnit, toMinorUnit } from "@shared/utils";

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

  useEffect(() => {
    setLocalProduct(product);
  }, [product.id]);

  // Push changes to product
  useEffect(() => {
    setProduct((prev) => ({
      ...prev,
      name: localProduct.name,
      price: localProduct.price,
      discount: localProduct.discount,
      discountType: localProduct.discountType,
      description: localProduct.description,
    }));
  }, [
    setProduct,
    localProduct.name,
    localProduct.price,
    localProduct.discount,
    localProduct.discountType,
    localProduct.description,
  ]);

  const discountTypeSymbol =
    localProduct.discountType === "PERCENTAGE" ? "%" : "$";
  return (
    <div className="flex flex-col flex-1 gap-md overflow-hidden p-0.5">
      {/* Name */}
      <Label>
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
        <Label className="w-32">
          Price
          <NumberInput
            symbol="$"
            onFocus={(e) => e.target.select()}
            value={toMajorUnit(localProduct.price)}
            onChange={(e) =>
              setLocalProduct((prev) => ({
                ...prev,
                price: toMinorUnit(parseFloat(e.target.value)),
              }))
            }
            required
          />
        </Label>

        {/* Discount */}
        <div className="flex items-end gap-sm">
          <Label>
            Discount
            <NumberInput
              symbol={discountTypeSymbol}
              className="text-center  w-32"
              onFocus={(e) => e.target.select()}
              value={
                localProduct.discount ? toMajorUnit(localProduct.discount) : ""
              }
              onChange={(e) =>
                setLocalProduct((prev) => ({
                  ...prev,
                  discount: toMinorUnit(parseFloat(e.target.value)),
                }))
              }
              step={localProduct.discountType === "PERCENTAGE" ? "0.01" : "1"}
            />
          </Label>

          {/* Discount Type */}
          <select
            className={inputVariants({ className: "w-10" })}
            value={discountTypeSymbol}
            onChange={(e) =>
              setLocalProduct((prev) => ({
                ...prev,
                discountType:
                  e.target.value === "%" ? "PERCENTAGE" : "FIXED_AMOUNT",
              }))
            }
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
      <Label>
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
