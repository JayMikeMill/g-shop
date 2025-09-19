import React, { useState, useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

interface ZoomImageBoxProps {
  image: string | null;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
  onDragState?: (dragging: boolean) => void;
}

const ZoomImageBox: React.FC<ZoomImageBoxProps> = ({
  image,
  className = "",
  onClick,
  onDragState,
}) => {
  const draggingRef = useRef(false);

  useEffect(() => {
    const handleResize = () => window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!image) return null;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(draggingRef.current);
    if (!draggingRef.current) {
      onClick?.(e as any);
    }
    draggingRef.current = false; // reset after click
  };

  return (
    <div
      className={`bg-surface border-border border rounded-2xl shadow-2xl flex p-1 ${className}`}
      onClick={handleClick}
    >
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={5}
        centerZoomedOut={false}
        limitToBounds={true}
        doubleClick={{ disabled: true }}
        pinch={{ disabled: false }}
        wheel={{ disabled: false, step: 0.05 }}
        onPanning={() => {
          draggingRef.current = true;
        }}
        onPanningStart={() => {
          onDragState?.(true);
        }}
        onPanningStop={() => {
          setTimeout(() => {
            draggingRef.current = false;
          }, 25);
          onDragState?.(false);
        }}
      >
        {() => (
          <TransformComponent
            wrapperStyle={{ width: "100%", height: "100%" }}
            contentStyle={{ width: "100%", height: "100%" }}
          >
            <img
              src={image}
              alt="Preview"
              draggable={false}
              className="object-contain w-full h-full rounded-lg touch-none"
              style={{ userSelect: "none" }}
            />
          </TransformComponent>
        )}
      </TransformWrapper>
    </div>
  );
};

export default ZoomImageBox;
