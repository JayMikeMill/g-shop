import { useState, useRef, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { type Control, Controller } from "react-hook-form";

interface SelectItem<T> {
  value: T;
  label?: string;
  render?: (item: T) => ReactNode;
}

interface AnimatedSelectProps<T> {
  items: SelectItem<T>[];
  value?: T;
  onChange?: (value: T) => void;
  actionName?: string; // Only for ActionSelector
  noItemsText?: string;
  className?: string;
  menuClassName?: string;

  controlProps?: { control: Control<any>; name: string; rules?: any };
  actionSelector?: boolean;
}

export const AnimatedSelect = <T,>({
  items,
  value,
  onChange,
  actionName,
  noItemsText = "No items",
  className,
  menuClassName,
  controlProps,
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

  const renderSelect = (
    selectedValue?: T,
    handleChange: (v: T) => void = () => {}
  ) => {
    // Button label
    let displayedLabel: string | ReactNode;

    const hasValue = selectedValue != null; // true if not null and not undefined
    if (actionName != undefined) {
      displayedLabel = actionName;
    } else if (hasValue) {
      const selectedItem = items.find((i) => i.value === selectedValue);
      displayedLabel = selectedItem?.label ?? String(selectedValue);
    } else if (items.length > 0) {
      displayedLabel = items[0].label ?? String(items[0].value);
    } else {
      displayedLabel = noItemsText;
    }

    return (
      <div ref={ref} className={`relative ${className ?? ""}`}>
        <button
          type="button"
          className={`bg-background text-base shadow-sm h-9 transition-all 
						rounded-md border px-2 py-1 w-full text-left flex justify-between
						${open ? "ring-2 ring-ring" : ""}`}
          onClick={() => setOpen((p) => !p)}
        >
          <span className={"w-full " + menuClassName}>{displayedLabel}</span>
          <span>{open ? "▲" : "▼"}</span>
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className={`absolute top-full left-0 z-10 mt-1 w-full 
								max-h-60 overflow-y-auto bg-background shadow-none
								border border-border rounded-md shadow-sm
								${menuClassName ?? ""}`}
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
                      actionName === undefined && selectedValue === item.value
                        ? "bg-primary/30"
                        : ""
                    }`}
                    onClick={() => {
                      handleChange(item.value); // trigger action or value update
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

  if (controlProps) {
    const { control, name, rules } = controlProps;
    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) => renderSelect(field.value, field.onChange)}
      />
    );
  }

  return renderSelect(value, onChange);
};
