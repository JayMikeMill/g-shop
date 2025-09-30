// CircleSpinner.tsx
import React from "react";

interface CircleSpinnerProps {
  text?: string;
}

export const CircleSpinner: React.FC<CircleSpinnerProps> = ({ text }) => {
  const size = 64; // default size
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div
        className="border-4 border-gray-200 border-t-primary rounded-full animate-spin"
        style={{ width: size, height: size }}
      />
      {text && <span className="text-3xl text-white">{text}</span>}
    </div>
  );
};
