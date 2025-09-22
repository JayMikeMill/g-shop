import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

// Icons
import { ArrowLeft, ArrowRight } from "lucide-react";

// Image carousel
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// Lightbox
import Lightbox from "yet-another-react-lightbox";
import { Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";

import type { Product, SelectedProductOption } from "@shared/types/product";
import { useCart } from "@contexts/cart-context";

import { useApi } from "@api/use-api";
import type { NavigationOptions } from "swiper/types";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduct } = useApi();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<
    SelectedProductOption[]
  >([]);

  const [activeIndex, setActiveIndex] = useState(0);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

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

  const handleOptionChange = (option: string, value: string) => {
    setSelectedOptions((prev) => {
      const filtered = prev.filter((o) => o.name !== option);
      return [...filtered, { name: option, value }];
    });
  };

  const handleAddToCart = () =>
    addToCart({ ...product, selectedOptions, quantity: 1 });

  return (
    <div className="max-w-4xl mx-auto p-mt-8">
      <div className="flex flex-col md:flex-row justify-center items-start md:items-start gap-8">
        {/* Image Gallery */}
        <div className="flex flex-col items-center w-full max-w-md md:max-w-lg">
          {/* Main Swiper */}
          <div className="w-full relative">
            {/* Refs for custom navigation */}
            <div
              ref={prevRef}
              className="custom-swiper-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 
              text-text w-12 h-12 flex items-center cursor-pointer active:opacity-100 
              md:hover:opacity-100 opacity-50"
            >
              <ArrowLeft className="text-accent" size={38} />
            </div>
            <div
              ref={nextRef}
              className="custom-swiper-next absolute right-0 top-1/2 -translate-y-1/2 z-10 
              text-text w-12 h-12 flex items-center cursor-pointer active:opacity-100 
              md:hover:opacity-100 opacity-50"
            >
              <ArrowRight className="text-accent" size={38} />
            </div>

            <Swiper
              modules={[Navigation, Thumbs]}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              onSwiper={(swiper) => {
                // Wait for refs to exist
                setTimeout(() => {
                  if (
                    prevRef.current &&
                    nextRef.current &&
                    swiper.params.navigation
                  ) {
                    // TypeScript still sees navigation as boolean | NavigationOptions
                    const nav = swiper.params.navigation as NavigationOptions;

                    nav.prevEl = prevRef.current;
                    nav.nextEl = nextRef.current;

                    swiper.navigation?.destroy();
                    swiper.navigation?.init();
                    swiper.navigation?.update();
                  }
                });
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              spaceBetween={10}
              slidesPerView={1}
              loop={false}
              className="w-full"
            >
              {product.images.map((img, idx) => (
                <SwiperSlide
                  key={idx}
                  className="flex justify-center items-center"
                >
                  <img
                    src={img.main}
                    alt={`Product ${idx}`}
                    className="object-contain w-full h-96 cursor-pointer"
                    onClick={(e) => {
                      const arrow = (e.target as HTMLElement).closest(
                        ".custom-swiper-next, .custom-swiper-prev"
                      );

                      // If click was on any arrow (enabled or disabled), do nothing
                      if (arrow) return;

                      // Otherwise, open lightbox
                      setLightboxIndex(idx);
                      setLightboxOpen(true);
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center w-full mt-4">
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={3}
              watchSlidesProgress
              className="!w-auto"
            >
              {product.images.map((img, idx) => (
                <SwiperSlide key={idx} className="flex justify-center !w-auto">
                  <img
                    src={img.preview}
                    alt={`Thumb ${idx}`}
                    className={`object-contain w-20 h-20 cursor-pointer border rounded-md transition-all ${
                      idx === activeIndex
                        ? "border-accent border-4" // highlight border and slightly enlarge
                        : ""
                    }`}
                    onClick={() => {
                      if (thumbsSwiper) thumbsSwiper.slideTo(idx);
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

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

          {/* Product Options */}
          {Array.isArray(product.options) && product.options.length > 0 && (
            <div className="mb-4">
              {product.options.map((opt) => (
                <div
                  key={opt.name}
                  className="flex flex-col min-w-[120px] mb-3"
                >
                  <span className="text-xl font-medium text-text mb-1">
                    {opt.name}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {opt.values.map((val) => (
                      <button
                        key={val.value}
                        className={`px-3 py-1 rounded-full border text-lg transition-all ${
                          selectedOptions.find(
                            (o) => o.name === opt.name && o.value === val.value
                          )
                            ? "bg-primary text-text border-primary"
                            : "bg-surface text-text border-border hover:bg-primaryDark"
                        }`}
                        onClick={() => handleOptionChange(opt.name, val.value)}
                        type="button"
                      >
                        {val.value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tags & Description */}
          {Array.isArray(product.tags) && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {product.tags.map((tag) => (
                <span key={tag} className="tag-box">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="text-text text-xl">Product Description</div>
          <div className="text-textSecondary mb-4 whitespace-pre-line">
            {product.description}
          </div>

          <div className="flex items-center justify-center gap-4 mt-4">
            <button className="btn-primary px-6 py-2" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          index={lightboxIndex}
          slides={product.images.map((img) => ({ src: img.main }))}
          close={() => setLightboxOpen(false)}
          plugins={[Zoom]}
          styles={{ container: { backgroundColor: "rgba(0,0,0,0.5)" } }}
          zoom={{ scrollToZoom: true, maxZoomPixelRatio: 2 }}
        />
      )}
    </div>
  );
};

export default ProductPage;
