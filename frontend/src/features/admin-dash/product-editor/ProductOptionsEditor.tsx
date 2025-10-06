// File: frontend/src/pages/admin/products-page/ProductOptionsEditor.tsx

// React
import React, { useEffect, useState } from "react";

// Types
import type { Product, ProductOption } from "@my-store/shared";

// UI Components
import { Button, Input, XButton } from "@components/ui";

// Api
import { useApi } from "@api/useApi";

// Components
import OptionsPresetDropdown from "./ProductOptionsPresetsDropdown";

interface ProductOptionsEditorProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
}

const ProductOptionsEditor: React.FC<ProductOptionsEditorProps> = ({
  product,
  setProduct,
}) => {
  const { productOptionsPresets } = useApi();
  const createPreset = productOptionsPresets.create();

  const [localOptions, setLocalOptions] = useState<ProductOption[]>(
    product.options ?? []
  );

  const [saving, setSaving] = useState(false);

  // Sync local options with product
  useEffect(() => {
    setLocalOptions(product.options ?? []);
  }, [product.id]);

  // Push changes to product
  useEffect(() => {
    setProduct((prev) => ({
      ...prev,
      options: localOptions,
    }));
  }, [localOptions, setProduct]);

  // Option management
  const addOption = () =>
    setLocalOptions((prev) => [...prev, { name: "", values: [] }]);
  const removeOption = (i: number) =>
    setLocalOptions((prev) => prev.filter((_, idx) => idx !== i));
  const updateOptionName = (i: number, name: string) =>
    setLocalOptions((prev) =>
      prev.map((opt, idx) => (idx === i ? { ...opt, name } : opt))
    );
  const updateOptionValues = (i: number, values: string) => {
    console.log("Updating values:", values);
    const parsedValues = [
      ...values.split(",").filter(Boolean),
      ...(values.endsWith(",") ? [""] : []),
    ];

    setLocalOptions((prev) =>
      prev.map((opt, idx) =>
        idx === i ? { ...opt, values: parsedValues } : opt
      )
    );
  };

  // Save preset
  const handleSavePreset = async () => {
    if (localOptions.length === 0) {
      alert("No options to save as preset.");
      return;
    }
    const name = prompt("Enter preset name:");
    if (!name) return;

    setSaving(true);
    try {
      await createPreset.mutateAsync({ name, productOptions: localOptions });
      alert("Preset saved successfully");
    } catch (err: any) {
      alert("Error saving preset: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Preset Dropdown */}
      <OptionsPresetDropdown setLocalOptions={setLocalOptions} />

      {/* Options List */}
      {localOptions.map((opt, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 py-4 border-t border-border"
        >
          <div className="flex flex-wrap gap-2 items-center w-full">
            <Input
              type="text"
              className="flex-1"
              placeholder="Option Name"
              value={opt.name}
              onChange={(e) => updateOptionName(i, e.target.value)}
            />
            <XButton className="w-8 h-8" onClick={() => removeOption(i)} />
          </div>
          <div className="flex flex-wrap gap-2 items-center w-full">
            <Input
              type="text"
              placeholder="Values (comma-separated)"
              value={opt?.values.join(",")}
              onChange={(e) => updateOptionValues(i, e.target.value)}
            />
          </div>
        </div>
      ))}

      {/* Bottom Buttons */}
      <div className="flex flex-wrap gap-2 w-full mt-auto">
        {localOptions.length > 0 && (
          <Button type="button" onClick={handleSavePreset} disabled={saving}>
            {saving ? "Saving..." : "Save Preset"}
          </Button>
        )}
        <Button type="button" onClick={addOption}>
          Add Option
        </Button>
      </div>
    </div>
  );
};

export default ProductOptionsEditor;
