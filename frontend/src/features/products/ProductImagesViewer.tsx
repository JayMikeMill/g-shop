import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductImageSet } from "shared/types";
import { Image, Lightbox } from "@components/ui";

interface ProductImagesViewerProps {
  images: ProductImageSet[];
}

export const ProductImagesViewer: React.FC<ProductImagesViewerProps> = ({
  images,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const scrollButtonClass = `custom-swiper-next absolute top-1/2 
	-translate-y-1/2 z-10 w-12 h-12 flex items-center cursor-pointer 
	opacity-60 md:hover:opacity-100`;

  return (
    <div className="flex flex-col items-center w-full max-w-md md:max-w-lg">
      {/* Main Swiper */}
      <div className="w-full relative">
        <div ref={prevRef} className={scrollButtonClass + " left-0"}>
          <ChevronLeft className="text-primary" size={38} />
        </div>
        <div ref={nextRef} className={scrollButtonClass + " right-0"}>
          <ChevronRight className="text-primary" size={38} />
        </div>

        <Swiper
          modules={[Navigation, Thumbs]}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation !== "boolean") {
              const nav = swiper.params.navigation as any;
              nav.prevEl = prevRef.current;
              nav.nextEl = nextRef.current;
            }
          }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          spaceBetween={10}
          slidesPerView={1}
          loop={false}
        >
          {images.map((img, idx) => (
            <SwiperSlide
              key={idx}
              className="flex  bg-surface border border-2 rounded-xl justify-center items-center"
            >
              <Image
                src={img.main}
                alt={`Product ${idx}`}
                className="object-contain   w-full h-96 cursor-pointer"
                onClick={(e) => {
                  const arrow = (e.target as HTMLElement).closest(
                    ".custom-swiper-next, .custom-swiper-prev"
                  );
                  if (arrow) return;
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
          centeredSlides
          centeredSlidesBounds
          slideToClickedSlide
          watchSlidesProgress
          className="!w-auto"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={idx} className="flex justify-center !w-auto">
              <Image
                src={img.preview}
                alt={`Thumb ${idx}`}
                className={`object-contain w-20 h-20 bg-surface cursor-pointer border rounded-md transition-all ${
                  idx === activeIndex ? "border-primary border-4" : ""
                }`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          index={lightboxIndex}
          slides={images.map((img) => ({ src: img.main }))}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductImagesViewer;
