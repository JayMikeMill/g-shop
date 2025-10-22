import React, { useState, useRef, useEffect } from "react";

export interface KebabMenuOption {
  label: string;
  onClick: () => void;
  className?: string;
}

export interface KebabMenuProps {
  options: KebabMenuOption[];
  buttonClassName?: string;
  menuClassName?: string;
}

const KebabMenu: React.FC<KebabMenuProps> = ({
  options,
  buttonClassName = "",
  menuClassName = "",
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="relative inline-block">
      <button
        aria-label="Open menu"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        className={`bg-transparent border-none cursor-pointer p-1 rounded w-8 h-8 flex items-center justify-center hover:bg-gray-100 ${buttonClassName}`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="4" cy="10" r="2" fill="#555" />
          <circle cx="10" cy="10" r="2" fill="#555" />
          <circle cx="16" cy="10" r="2" fill="#555" />
        </svg>
      </button>
      {open && (
        <div
          className={`absolute top-full left-0 min-w-[100px] bg-white shadow-lg rounded z-10 py-1 border border-gray-200 ${menuClassName}`}
        >
          {options.map((opt, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                opt.onClick();
              }}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${opt.className || "text-gray-700"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export { KebabMenu };
