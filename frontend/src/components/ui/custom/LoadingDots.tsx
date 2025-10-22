import React, { useEffect } from "react";

export const LoadingDots: React.FC<{ speed?: number }> = ({ speed = 400 }) => {
  const [dotCount, setDotCount] = React.useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((c) => (c >= 3 ? 1 : c + 1));
    }, speed);
    return () => clearInterval(interval);
  }, [speed]);
  return <span>{".".repeat(dotCount)}&nbsp;</span>;
};

export default LoadingDots;
