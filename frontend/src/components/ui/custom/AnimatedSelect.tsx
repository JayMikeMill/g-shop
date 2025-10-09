import { useState, useRef, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, inputBorder } from "@components/ui";

interface SelectItem<T> {
  value: T;
  label?: string;
  render?: (item: T) => ReactNode;
}

interface AnimatedSelectProps<T> {
  items: SelectItem<T>[];
  value?: T;
  onChange?: (value: T) => void;
  placeholder?: string;
  noItemsText?: string;
  className?: string;
  menuClassName?: string;
}

export const AnimatedSelect = <T,>({
  items,
  value,
  onChange,
  placeholder = "Select...",
  noItemsText = "No items",
  className,
  menuClassName,
}: AnimatedSelectProps<T>) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Find selected item label
  const selectedItem = items.find((i) => i.value === value);
  const selectedLabel =
    selectedItem?.label ??
    (selectedItem?.render
      ? selectedItem.render(selectedItem.value)
      : undefined) ??
    placeholder;

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        className={`bg-background text-base shadow-sm transition-all 
          rounded-md border px-2 py-1 w-full text-left flex text-base
					justify-between items-center 
          ${open ? "ring-2 ring-ring" : ""}`}
        onClick={() => setOpen((p) => !p)}
      >
        <span>{selectedLabel}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -40 }} // start slightly above
            animate={{ opacity: 1, y: 0 }} // slide to normal position
            exit={{ opacity: 0, y: -40 }} // slide back up when exiting
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`
              absolute top-full left-0 z-10 mt-1 w-full 
              max-h-60 overflow-y-auto bg-background shadow-none
              border border-border rounded-md shadow-sm
              ${menuClassName ?? ""} shadow
            `}
          >
            {items.length === 0 ? (
              <div className="px-2 py-1 text-muted-foreground">
                {noItemsText}
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={idx}
                  className={`px-2 py-1 cursor-pointer hover:bg-primary-100 transition-colors ${
                    value === item.value ? "bg-primary/30" : ""
                  }`}
                  onClick={() => {
                    onChange?.(item.value);
                    setOpen(false);
                  }}
                >
                  {item.render
                    ? item.render(item.value)
                    : (item.label ?? String(item.value))}
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
