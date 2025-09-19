import React, { useState, useEffect, useRef } from "react";
import ZoomImageBox from "./zoom-image-box";

interface LightboxProps {
  image: string | null;
  onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ image, onClose }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const isDraggingRef = useRef(false); // track dragging inside ZoomImageBox
  const skipNextClick = useRef(false); // skip overlay click if it’s from drag

  useEffect(() => {
    const handleResize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!image) return null;

  const isPortrait = windowSize.width < windowSize.height;
  const size = isPortrait
    ? Math.min(windowSize.width * 0.9, windowSize.height * 0.9)
    : Math.min(windowSize.height * 0.9, windowSize.width * 0.9);

  const containerStyle = { width: size, height: size };

  // overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // skip click if it came from a drag
    if (e.target === e.currentTarget && !skipNextClick.current) {
      onClose();
    }
    // reset the skip flag
    skipNextClick.current = false;
  };

  // this will be called by ZoomImageBox when dragging starts/ends
  const handleDragState = (dragging: boolean) => {
    isDraggingRef.current = dragging;
    if (dragging) skipNextClick.current = true;
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleOverlayClick}
      style={{ touchAction: "none" }}
    >
      <div style={containerStyle}>
        <ZoomImageBox
          image={image}
          className="w-full h-full"
          onDragState={handleDragState} // pass drag state to parent
        />
      </div>

      <button
        className="absolute top-4 right-4 text-white text-3xl font-bold bg-black bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center hover:bg-opacity-80 transition"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        &times;
      </button>
    </div>
  );
};

export default Lightbox;
