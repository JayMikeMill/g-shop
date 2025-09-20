import React, { useRef, useState } from "react";
import { type Product } from "@models/product";

interface ProductImageViewProps {
  product: Product;
  className?: string;
  onClick?: (url: string) => void;
  mainImageHeight?: string;
}

const ProductImageView: React.FC<ProductImageViewProps> = ({
  product,
  className = "",
  onClick,
  mainImageHeight = "400px",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mainImage, setMainImage] = useState(product.images?.[0]?.main || "");

  if (!product.images || product.images.length === 0) return null;

  // Scroll one image for arrow buttons
  const scrollByOne = (direction: "left" | "right") => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const imageWidth = container.clientWidth;
    const targetScroll =
      direction === "right"
        ? container.scrollLeft + imageWidth
        : container.scrollLeft - imageWidth;
    container.scrollTo({ left: targetScroll, behavior: "smooth" });
  };

  // Snap to the nearest image
  const snapToImage = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const imageWidth = container.clientWidth;
    const index = Math.round(container.scrollLeft / imageWidth);
    const targetScroll = index * imageWidth;
    container.scrollTo({ left: targetScroll, behavior: "smooth" });
    setMainImage(product.images[index]?.main || mainImage);
  };

  const handleMainClick = () => onClick?.(mainImage);

  return (
    <div className={`relative ${className}`}>
      {/* Main image container */}
      <div
        className="relative w-full overflow-x-auto rounded-lg"
        style={{ height: mainImageHeight }}
        ref={containerRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onPointerUp={snapToImage} // snap after drag ends
        onTouchEnd={snapToImage} // snap for touch devices
      >
        {/* Left arrow */}
        {hovered && product.images.length > 1 && (
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 z-10"
            onClick={() => scrollByOne("left")}
          >
            ‹
          </button>
        )}

        {/* Right arrow */}
        {hovered && product.images.length > 1 && (
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2 z-10"
            onClick={() => scrollByOne("right")}
          >
            ›
          </button>
        )}

        {/* Scrollable images */}
        <div className="flex h-full snap-x snap-mandatory scroll-smooth">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img.main}
              alt={`${product.name} image ${idx + 1}`}
              className="flex-shrink-0 w-full h-full object-contain select-none cursor-pointer snap-start"
              draggable={false}
              onClick={handleMainClick}
            />
          ))}
        </div>
      </div>

      {/* Preview images */}
      <div className="flex justify-center mt-2 gap-2">
        {product.images.slice(0, 3).map((img, idx) => (
          <img
            key={idx}
            src={img.preview}
            alt={`${product.name} preview ${idx + 1}`}
            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
              mainImage === img.main
                ? "border-yellow-500"
                : "border-transparent"
            }`}
            draggable={false}
            onClick={() => setMainImage(img.main)}
          />
        ))}
      </div>

      {/* Scrollbar */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 mt-1">
        <div style={{ width: `${product.images.length * 100}%` }}></div>
      </div>
    </div>
  );
};

export default ProductImageView;
