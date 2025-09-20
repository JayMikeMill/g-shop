import React, { useEffect, useState, useRef } from "react";
import type { ProductOption, ProductOptionPreset } from "@models/product";
import { useApi } from "@api/use-api";

interface ProductOptionsEditorProps {
  options: ProductOption[];
  setOptions: React.Dispatch<React.SetStateAction<ProductOption[]>>;
}

const ProductOptionsEditor: React.FC<ProductOptionsEditorProps> = ({
  options = [],
  setOptions,
}) => {
  const {
    createProductOptionsPreset,
    getProductOptionsPresets,
    deleteProductOptionsPreset,
  } = useApi();

  const [presets, setPresets] = useState<ProductOptionPreset[]>([]);
  const [loadingPresets, setLoadingPresets] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load presets only once on mount
  useEffect(() => {
    let mounted = true;
    const loadPresets = async () => {
      setLoadingPresets(true);
      try {
        const data = await getProductOptionsPresets();
        if (mounted) setPresets(data);
      } catch (err: any) {
        if (mounted) alert("Failed to load presets: " + err.message);
      } finally {
        if (mounted) setLoadingPresets(false);
      }
    };
    loadPresets();
    return () => {
      mounted = false;
    };
  }, []); // <-- empty dependency array fixes constant reload

  // Click outside to close dropdown
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // --- Option / Value Management ---
  const addOption = () =>
    setOptions((prev) => [
      ...prev,
      { name: "", values: [{ value: "", stock: 0 }] },
    ]);
  const removeOption = (i: number) =>
    setOptions((prev) => prev.filter((_, idx) => idx !== i));
  const addValue = (optIndex: number) =>
    setOptions((prev) =>
      prev.map((opt, i) =>
        i === optIndex
          ? { ...opt, values: [...opt.values, { value: "", stock: 0 }] }
          : opt
      )
    );
  const removeValue = (optIndex: number, valIndex: number) =>
    setOptions((prev) =>
      prev.map((opt, i) =>
        i === optIndex
          ? { ...opt, values: opt.values.filter((_, vi) => vi !== valIndex) }
          : opt
      )
    );
  const updateOptionName = (index: number, name: string) =>
    setOptions((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, name: name || "" } : opt))
    );
  const updateValue = (
    optIndex: number,
    valIndex: number,
    field: "value" | "stock",
    val: string | number
  ) =>
    setOptions((prev) =>
      prev.map((opt, i) =>
        i === optIndex
          ? {
              ...opt,
              values: opt.values.map((v, vi) =>
                vi === valIndex
                  ? {
                      ...v,
                      value: field === "value" ? String(val || "") : v.value,
                      stock: field === "stock" ? Number(val) || 0 : v.stock,
                    }
                  : v
              ),
            }
          : opt
      )
    );

  // --- Preset Actions ---
  const handleSavePreset = async (option: ProductOption) => {
    const name = prompt("Enter preset name:");
    if (!name) return;
    try {
      const newPreset = await createProductOptionsPreset({
        name,
        values: option.values,
      });
      setPresets((prev) => [...prev, newPreset]);
      alert("Preset saved successfully");
    } catch (err: any) {
      alert("Error saving preset: " + err.message);
    }
  };

  const handleApplyPreset = (preset: ProductOptionPreset) => {
    setOptions((prev) => [
      ...prev,
      { name: preset.name, values: preset.values },
    ]);
    setDropdownOpen(false);
  };

  const handleDeletePreset = async (id: number | string) => {
    if (!confirm("Are you sure you want to delete this preset?")) return;
    try {
      await deleteProductOptionsPreset(id);
      setPresets((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert("Failed to delete preset: " + err.message);
    }
  };

  return (
    <div className="border border-border rounded-md p-4 flex flex-col gap-4 w-full max-w-full flex-1 overflow-y-auto overflow-x-hidden">
      <h3 className="text-lg font-semibold text-text">Product Options</h3>

      {/* Preset Dropdown */}
      <div ref={dropdownRef} className="relative w-full max-w-sm mb-2">
        <button
          type="button"
          className="input-box px-2 py-1 w-full text-left flex justify-between items-center text-text bg-background border border-border rounded"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          Select Preset...
          <span>▼</span>
        </button>

        <div
          className={`absolute z-10 mt-1 w-full bg-background border border-border rounded shadow-md max-h-60 overflow-y-auto transition-opacity duration-150 ${dropdownOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
          {loadingPresets ? (
            <div className="px-2 py-1 text-text">Loading...</div>
          ) : presets.length === 0 ? (
            <div className="px-2 py-1 text-text">No presets found</div>
          ) : (
            presets.map((p) => (
              <div
                key={p.id}
                className="flex justify-between items-center bg-background px-2 py-1 hover:bg-secondary cursor-pointer text-text"
              >
                <span className="flex-1" onClick={() => handleApplyPreset(p)}>
                  {p.name}
                </span>
                <button
                  type="button"
                  className="btn-circle-x"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePreset(p.id);
                  }}
                >
                  X
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Options List */}
      {options.map((opt, i) => (
        <div
          key={i}
          className="p-2 flex flex-col gap-2 w-full max-w-full border-b border-border pb-2"
        >
          <div className="flex flex-wrap gap-2 items-center w-full">
            <input
              type="text"
              placeholder="Option Name"
              value={opt.name}
              onChange={(e) => updateOptionName(i, e.target.value)}
              className="input-box flex-1 min-w-0 px-2 py-1"
            />
            <div className="w-20 text-center font-medium text-text">Stock</div>
            <button
              type="button"
              className="btn-circle-x"
              onClick={() => removeOption(i)}
            >
              X
            </button>
          </div>

          <div className="flex flex-col gap-2 w-full max-w-full">
            {opt.values.map((val, vi) => (
              <div
                key={vi}
                className="flex flex-wrap gap-2 items-center w-full"
              >
                <input
                  type="text"
                  placeholder="Value"
                  value={val.value}
                  onChange={(e) => updateValue(i, vi, "value", e.target.value)}
                  className="input-box flex-1 min-w-0 px-2 py-1"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={val.stock}
                  onChange={(e) =>
                    updateValue(i, vi, "stock", Number(e.target.value))
                  }
                  className="input-box w-20 flex-shrink-0 px-2 py-1 text-center"
                />
                <button
                  type="button"
                  className="btn-circle-x"
                  onClick={() => removeValue(i, vi)}
                >
                  X
                </button>
              </div>
            ))}

            <div className="flex gap-2 mt-1">
              <button
                type="button"
                className="btn-primary w-fit px-3 py-1"
                onClick={() => addValue(i)}
              >
                Add Value
              </button>
              <button
                type="button"
                className="btn-secondary w-fit px-3 py-1"
                onClick={() => handleSavePreset(opt)}
              >
                Save Preset
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Bottom Buttons */}
      <div className="flex flex-wrap gap-2 w-full mt-auto">
        <button
          type="button"
          className="btn-primary px-3 py-2 flex-shrink-0"
          onClick={addOption}
        >
          Add Option
        </button>
      </div>
    </div>
  );
};

export default ProductOptionsEditor;
