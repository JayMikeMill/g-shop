// src/components/ProductOptionsEditor.tsx
import React from "react";
import type { ProductOption } from "@models/product";

interface ProductOptionsEditorProps {
  options: ProductOption[];
  setOptions: React.Dispatch<React.SetStateAction<ProductOption[]>>;
}

const ProductOptionsEditor: React.FC<ProductOptionsEditorProps> = ({
  options = [],
  setOptions,
}) => {
  const createPreset = async (opts: ProductOption[]) => {};

  // Add new option
  const addOption = () => {
    setOptions((prev) => [
      ...prev,
      {
        name: "", // always string
        values: [{ value: "", stock: 0 }], // default
      },
    ]);
  };

  const removeOption = (index: number) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const addValue = (optIndex: number) => {
    setOptions((prev) =>
      prev.map((opt, idx) =>
        idx === optIndex
          ? { ...opt, values: [...opt.values, { value: "", stock: 0 }] }
          : opt
      )
    );
  };

  const removeValue = (optIndex: number, valIndex: number) => {
    setOptions((prev) =>
      prev.map((opt, idx) =>
        idx === optIndex
          ? {
              ...opt,
              values: opt.values.filter((_, vIdx) => vIdx !== valIndex),
            }
          : opt
      )
    );
  };

  // Update option name, never null
  const updateOptionName = (index: number, name: string) => {
    setOptions((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, name: name || "" } : opt))
    );
  };

  // Update value, always string for value, number for stock
  const updateValue = (
    optIndex: number,
    valIndex: number,
    field: "value" | "stock",
    val: string | number
  ) => {
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
  };

  const handleSavePreset = async () => {
    try {
      await createPreset(options);
      alert("Preset saved successfully");
    } catch (err: any) {
      alert("Error saving preset: " + err.message);
    }
  };

  return (
    <div className="border border-border rounded-md p-4 flex flex-col gap-4 w-full max-w-full flex-1 overflow-y-auto overflow-x-hidden">
      {/* Header */}
      <h3 className="text-lg font-semibold text-text">Product Options</h3>

      {/* Options List */}
      {options.map((opt, i) => (
        <div key={i} className="p-2 flex flex-col gap-2 w-full max-w-full">
          {/* Option Header: Name + Delete */}
          <div className="flex flex-wrap gap-2 items-center w-full">
            <input
              type="text"
              placeholder="Option Name"
              value={opt.name}
              onChange={(e) => updateOptionName(i, e.target.value)}
              className="input-border flex-1 min-w-0 px-2 py-1"
            />
            {/* Stock Label above values */}
            <div className="w-20 text-center font-medium text-text">Stock</div>
            <button
              type="button"
              className="btn-danger px-2 py-1 flex-shrink-0 rounded-full"
              onClick={() => removeOption(i)}
            >
              X
            </button>
          </div>

          {/* Values List */}
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
                  className="input-border flex-1 min-w-0 px-2 py-1"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={val.stock} // always number
                  onChange={(e) =>
                    updateValue(i, vi, "stock", Number(e.target.value))
                  }
                  className="input-border w-20 flex-shrink-0 px-2 py-1 text-center"
                />
                <button
                  type="button"
                  className="btn-danger px-2 py-1 flex-shrink-0 rounded-full text-xm"
                  onClick={() => removeValue(i, vi)}
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn-primary w-fit px-3 py-1 mt-1"
              onClick={() => addValue(i)}
            >
              Add Value
            </button>
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
        <button
          type="button"
          className="btn-secondary px-3 py-2 flex-shrink-0"
          onClick={handleSavePreset}
        >
          Save as Preset
        </button>
      </div>
    </div>
  );
};

export default ProductOptionsEditor;
