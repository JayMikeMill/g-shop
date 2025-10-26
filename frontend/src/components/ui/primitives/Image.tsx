import React, { useState } from "react";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  loader?: boolean; // optional prop to show/hide loader
}

export function Image({ loader = true, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative w-full h-full`}>
      <img
        {...props}
        className={` transition-opacity duration-200 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${props.className ?? ""}`}
        onLoad={(e) => {
          setLoaded(true);
          if (props.onLoad) props.onLoad(e);
        }}
      />
      {/* Only show loader if prop is true */}
      {loader && !loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
