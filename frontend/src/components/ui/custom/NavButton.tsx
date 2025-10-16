import React from "react";

interface NavButtonProps {
  to?: string; // optional if you want to handle navigation manually
  label: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const NavButton: React.FC<NavButtonProps> = ({
  to,
  label,
  className,
  onClick,
}) => {
  const btnClassName = `flex border text-center items-center justify-center text-xl
		hover:bg-primary-400 hover:text-accent-foreground transition-colors duration-200
		${className || ""}`;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);

    // Optional: handle navigation manually if `to` is provided
    if (to) {
      window.location.href = to;
    }
  };

  return (
    <button onClick={handleClick} className={btnClassName}>
      {label}
    </button>
  );
};

export { NavButton };
