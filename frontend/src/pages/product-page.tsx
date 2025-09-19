import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useApi } from "@api/use-api";

import type { Product, SelectedProductOption } from "@models/product";
import { useCart } from "@contexts/cart-context";
import Lightbox from "@components/viewers/light-box";
import ZoomImageBox from "@components/viewers/zoom-image-box";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduct } = useApi();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<
    SelectedProductOption[]
  >([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getProduct(id).then((p) => {
        setProduct(p);
        setMainImage(p?.images?.[0]?.main || null);
      });
    }
  }, [id]);

  if (!product) {
    return <div className="p-8 text-center text-textSecondary">Loading...</div>;
  }

  const discountedPrice = product.discount
    ? typeof product.discount === "string" && product.discount.includes("%")
      ? product.price * (1 - parseFloat(product.discount) / 100)
      : product.price - parseFloat(product.discount)
    : product.price;

  const discountLabel = product.discount
    ? typeof product.discount === "string" && product.discount.includes("%")
      ? product.discount // already something like "30%"
      : `$${parseFloat(product.discount).toFixed(2)}` // formats money like "$2.00"
    : null;

  const handleOptionChange = (option: string, value: string) => {
    setSelectedOptions((prev) => {
      const filtered = prev.filter((o) => o.name !== option);
      return [...filtered, { name: option, value }];
    });
  };

  const handleAddToCart = () => {
    addToCart({ ...product, selectedOptions, quantity: 1 });
  };

  return (
    <div className="max-w-4xl mx-auto p-mt-8">
      {/* Main flex container: column on mobile, row on desktop, centered */}
      <div className="flex flex-col md:flex-row justify-center items-center md:items-start">
        {/* Product Name & Price (Mobile) */}
        <div className="md:hidden mb-4 text-center">
          <h1 className="text-3xl font-bold text-text mb-2">{product.name}</h1>
          <div className="flex justify-center items-center gap-4 mb-2">
            {product.discount && discountedPrice < product.price ? (
              <>
                <span className="text-xl text-textSecondary line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-2xl text-text font-bold">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="bg-accent text-text px-2 py-1 rounded text-xs font-semibold">
                  {discountLabel} OFF!
                </span>
              </>
            ) : (
              <span className="text-2xl text-blue-600 font-bold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
        {/* Images */}
        <div className="flex flex-col items-center w-full">
          {mainImage && (
            <div className="relative w-full max-w-md md:max-w-lg lg:max-w-xl aspect-[4/3] mb-4 cursor-pointer">
              <ZoomImageBox
                image={mainImage}
                className="w-full h-full object-contain "
                onClick={() => setLightboxOpen(true)}
              />

              <span className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                Click to enlarge
              </span>
            </div>
          )}
          <div className="flex gap-2 mt-2 flex-wrap justify-center">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img.thumbnail}
                alt={product.name + " thumbnail " + i}
                className={`w-16 h-16 min-w-[64px] min-h-[64px] object-cover rounded border cursor-pointer ${mainImage === img.main ? "ring-2 ring-primary" : ""}`}
                onClick={() => setMainImage(img.main)}
              />
            ))}
          </div>
        </div>
        {/* Details (Desktop + Mobile) */}
        <div className="flex flex-col gap-4 mt-6 md:mt-0 w-auto text-left self-start">
          {/* Product Name & Price (Desktop) */}
          <div className="hidden md:block">
            <h1 className="text-3xl font-bold text-text mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-2">
              {product.discount && discountedPrice < product.price ? (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-2xl text-text font-bold">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                    {discountLabel} OFF!
                  </span>
                </>
              ) : (
                <span className="text-2xl text-blue-600 font-bold">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          {/* Options */}
          {product.options && product.options.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-col gap-3">
                {product.options.map((opt) => (
                  <div key={opt.name} className="flex flex-col min-w-[120px]">
                    <span className="text-sm font-medium text-text mb-1">
                      {opt.name}
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      {opt.values.map((val) => (
                        <button
                          key={val.value}
                          className={`px-3 py-1 rounded-full border text-sm transition-all ${
                            selectedOptions.find(
                              (o) =>
                                o.name === opt.name && o.value === val.value
                            )
                              ? "bg-primary text-text border-primary"
                              : "bg-surface text-text border-gray-300 hover:bg-primaryDark"
                          }`}
                          onClick={() =>
                            handleOptionChange(opt.name, val.value)
                          }
                          type="button"
                        >
                          {val.value}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-primary text-text px-2 py-1 rounded text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {/* Description */}
          <div className="text-text text-xl">Product Description</div>
          <div className="text-textSecondary mb-4 whitespace-pre-line">
            {product.description}
          </div>
          {/* Add to Cart */}
          <div className="flex items-center gap-4 mt-4">
            <button className="btn-primary px-6 py-2" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <span className="text-gray-500 text-sm">
              Stock: {product.stock}
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox image={mainImage} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
};

export default ProductPage;
