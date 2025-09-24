import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { type Product, type ProductVariant } from "@shared/types/Product";

import { useCart } from "@contexts/CartContext";
import { useApi } from "@api/useApi";

import ProductOptionSelector from "./ProductOptionsSelector";
import ProductPageImages from "./ProductPageImages";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduct } = useApi();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );

  useEffect(() => {
    if (id) {
      getProduct(id).then((p) => setProduct(p));
    }
  }, [id]);

  if (!product)
    return <div className="p-8 text-center text-textSecondary">Loading...</div>;

  const discountedPrice = product.discount
    ? typeof product.discount === "string" && product.discount.includes("%")
      ? product.price * (1 - parseFloat(product.discount) / 100)
      : product.price - parseFloat(product.discount)
    : product.price;

  const discountLabel =
    product.discount &&
    typeof product.discount === "string" &&
    product.discount.includes("%")
      ? product.discount
      : product.discount
        ? `$${parseFloat(product.discount).toFixed(2)}`
        : null;

  const handleAddToCart = () => {
    addToCart({
      product: product,
      variant: selectedVariant ?? undefined,
      quantity: 1,
      price: selectedVariant?.priceOverride ?? discountedPrice,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-mt-8">
      <div className="flex flex-col md:flex-row justify-center items-start md:items-start gap-8">
        // Inside your render
        <ProductPageImages images={product.images ?? []} />
        {/* Product Details */}
        <div className="flex flex-col gap-4 w-auto  text-left self-start">
          <div className="flex items-center justify-center">
            <h1 className="text-3xl font-bold text-text mb-2">
              {product.name}
            </h1>
          </div>
          <div className="flex items-center justify-center gap-4 mb-2">
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

          <ProductOptionSelector
            product={product}
            onVariantChange={setSelectedVariant}
          />

          {/* Tags & Description */}
          {Array.isArray(product.tags) && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {product.tags.map((tag, index) => (
                <span key={index} className="tag-box">
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          <div className="text-text text-xl">Product Description</div>
          <div className="text-textSecondary mb-4 whitespace-pre-line">
            {product.description}
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              className="btn-primary px-6 py-2"
              onClick={handleAddToCart}
              disabled={!selectedVariant}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
