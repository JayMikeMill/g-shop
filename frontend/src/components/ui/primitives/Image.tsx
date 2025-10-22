import React, { useState } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

export function Image({ ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative">
      <img
        {...props}
        className={`${props.className ?? ""}  transition-opacity duration-200 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={(e) => {
          setLoaded(true);
          if (props.onLoad) props.onLoad(e);
        }}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50">
          <div className="w-6 h-6 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
