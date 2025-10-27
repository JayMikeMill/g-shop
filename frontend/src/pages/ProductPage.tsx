import { useParams } from "react-router-dom";
import { useState } from "react";

import type { ProductVariant } from "shared/types";

// Cart state management
import { useCart, useDataApi } from "@app/hooks";

import ProductOptionSelector from "@features/products/ProductOptionsSelector";
import ProductImagesViewer from "@features/products/ProductImagesViewer";
import { Button, TagBox } from "@components/ui";
import { toMajorPriceString } from "shared/utils";
import { ProductPageSkeleton } from "@features/products/ProductPageSkeleton";

const ProductPage = () => {
  // Get product ID from URL params
  const { id } = useParams<{ id: string }>();

  // Cart context, API hooks
  const { addCartItem } = useCart();
  const { products } = useDataApi();

  // Fetch product data
  const { data: product, isLoading, error } = products.getOne({ id: id ?? "" });

  // Local state for selected variant
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );

  // Handle loading and error states
  if (isLoading || !product) {
    return <ProductPageSkeleton />;
  } else if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load product: {String((error as any).message)}
      </div>
    );
  }

  // Calculate discounted price if applicable
  const discountedPrice = product.price - (product.discount ?? 0);

  // Format discount label
  const discountLabel =
    (product.discount ? (toMajorPriceString(product.discount) ?? "0") : "0") +
    (product.discountType === "PERCENTAGE" ? "%" : "$");

  // Handle adding product to cart
  const handleAddToCart = () => {
    addCartItem({
      productId: product.id!,
      product,
      variantId: selectedVariant?.id ?? undefined,
      variant: selectedVariant ?? undefined,
      quantity: 1,
    });
  };

  console.log("Rendering ProductPage for product:", product, selectedVariant);

  return (
    <div className="p-mt-xl p-md">
      <div className="flex flex-col md:flex-row justify-center md:items-start pb-sm">
        {/* Small screen: Name & Price above image */}
        <div className="flex flex-col gap-2 md:hidden items-center w-full px-md">
          <h1 className="text-2xl font-bold text-text text-center">
            {product.longName || product.name}
          </h1>

          {/* Price display with discount handling */}
          <div className="flex items-center justify-center gap-sm py-md">
            {product.discount && discountedPrice < product.price ? (
              <>
                <span className="text-xl text-textMuted line-through">
                  ${toMajorPriceString(product.price)}
                </span>
                <span className="text-2xl text-text font-bold">
                  ${toMajorPriceString(discountedPrice)}
                </span>
                <span className="tag-box">{discountLabel} OFF!</span>
              </>
            ) : (
              <span className="text-2xl text-foreground  font-bold">
                ${toMajorPriceString(product.price)}
              </span>
            )}
          </div>
        </div>

        {/* Product Images */}
        <div className="w-full md:w-auto flex justify-center pb-4">
          <ProductImagesViewer images={product.images ?? []} />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-md w-full md:w-auto text-left self-start px-md">
          <div className="hidden md:flex flex-col gap-sm">
            <h1 className="text-xl font-bold text-text">
              {product.longName || product.name}
            </h1>
            <div className="flex items-center gap-md py-md">
              {product.discount && discountedPrice < product.price ? (
                <>
                  <span className="text-xl text-textMuted line-through">
                    ${toMajorPriceString(product.price)}
                  </span>
                  <span className="text-2xl text-text font-bold">
                    ${toMajorPriceString(discountedPrice)}
                  </span>
                  <span className="tag-box">{discountLabel} OFF!</span>
                </>
              ) : (
                <span className="text-2xl text-foreground font-bold">
                  ${toMajorPriceString(product.price)}
                </span>
              )}
            </div>
          </div>

          {/* Product Options Selector */}
          <ProductOptionSelector
            product={product}
            onVariantChange={setSelectedVariant}
          />

          {/* Product Tags */}
          {Array.isArray(product.tags) && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {product.tags.map((tag, index) => (
                <TagBox
                  key={index}
                  text={tag.name}
                  color={tag.color ?? "accent"}
                  textColor={tag.textColor ?? "#fff"}
                />
              ))}
            </div>
          )}

          {/* Product Description */}
          <div className="text-text text-xl font-semibold">
            Product Description
          </div>
          <div className="text-textSecondary mb-4">
            <ul className="list-disc list-inside">
              {product.description
                .split("\n") // split by line breaks
                .filter((line) => line.trim() !== "") // remove empty lines
                .map((line, idx) => (
                  <li key={idx}>{line}</li>
                ))}
            </ul>
          </div>

          {/* Add to Cart Button */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button
              onClick={handleAddToCart}
              disabled={!selectedVariant && product.stock === 0}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
