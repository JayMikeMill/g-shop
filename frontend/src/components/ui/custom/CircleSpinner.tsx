// CircleSpinner.tsx
import React from "react";

interface CircleSpinnerProps {
  text?: string;
}

export const CircleSpinner: React.FC<CircleSpinnerProps> = ({ text }) => {
  const size = 64; // default size
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30"
      style={{ backdropFilter: "blur(2px)" }}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <div
          className="border-8 border-gray-200 border-t-primary rounded-full animate-spin z-50"
          style={{ width: size, height: size }}
        />
        {text && (
          <span
            className="text-3xl text-white"
            style={{
              textShadow: "0 0 5px rgba(0,0,0,1)",
            }}
          >
            {text}
          </span>
        )}
      </div>
    </div>
  );
};
