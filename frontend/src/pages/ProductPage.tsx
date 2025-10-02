import { useParams } from "react-router-dom";
import { useState } from "react";

import type { ProductVariant } from "@shared/types/Product";

// Cart state management
import { useCart } from "@features/cart/useCart";

import { useApi } from "@api/useApi";

import ProductOptionSelector from "@features/products/ProductOptionsSelector";
import ProductImagesViewer from "@features/products/ProductImagesViewer";
import { Button, TagBox } from "@components/ui";

const ProductPage = () => {
  // Get product ID from URL params
  const { id } = useParams<{ id: string }>();

  // Cart context, API hooks
  const { addItem } = useCart();
  const { products } = useApi();

  // Fetch product data
  const { data: product, isLoading, error } = products.getOne(id ?? "");

  // Local state for selected variant
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );

  // Handle loading and error states
  if (isLoading || !product) {
    return <div className="p-8 text-center text-textSecondary">Loading...</div>;
  } else if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load product: {String((error as any).message)}
      </div>
    );
  }

  // Calculate discounted price if applicable
  const discountedPrice = product.discount
    ? typeof product.discount === "string" && product.discount.includes("%")
      ? product.price * (1 - parseFloat(product.discount) / 100)
      : product.price - parseFloat(product.discount)
    : product.price;

  // Format discount label
  const discountLabel =
    product.discount &&
    typeof product.discount === "string" &&
    product.discount.includes("%")
      ? product.discount
      : product.discount
        ? `$${parseFloat(product.discount).toFixed(2)}`
        : null;

  // Handle adding product to cart
  const handleAddToCart = () => {
    addItem({
      product,
      variant: selectedVariant ?? undefined,
      quantity: 1,
      price: selectedVariant?.price ?? discountedPrice,
    });
  };

  return (
    <div className="p-mt-8 p-4">
      <div className="flex flex-col md:flex-row justify-center md:items-start pb-2">
        {/* Small screen: Name & Price above image */}
        <div className="flex flex-col gap-2 md:hidden items-center w-full px-4">
          <h1 className="text-4xl font-bold text-text text-center">
            {product.name}
          </h1>

          {/* Price display with discount handling */}
          <div className="flex items-center justify-center gap-2">
            {product.discount && discountedPrice < product.price ? (
              <>
                <span className="text-xl text-textMuted line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-2xl text-text font-bold">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="tag-box">{discountLabel} OFF!</span>
              </>
            ) : (
              <span className="text-2xl text-blue-600 font-bold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Product Images */}
        <div className="w-full md:w-auto flex justify-center pb-4">
          <ProductImagesViewer images={product.images ?? []} />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-4 w-full md:w-auto text-left self-start px-4 md:px-0">
          <div className="hidden md:flex flex-col gap-2">
            <h1 className="text-3xl font-bold text-text">{product.name}</h1>
            <div className="flex items-center gap-4">
              {product.discount && discountedPrice < product.price ? (
                <>
                  <span className="text-xl text-textMuted line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-2xl text-text font-bold">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="tag-box">{discountLabel} OFF!</span>
                </>
              ) : (
                <span className="text-2xl text-blue-600 font-bold">
                  ${product.price.toFixed(2)}
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
          <div className="text-text text-xl">Product Description</div>
          <div className="text-textSecondary mb-4 whitespace-pre-line">
            {product.description}
          </div>

          {/* Add to Cart Button */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button onClick={handleAddToCart} disabled={!selectedVariant}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
