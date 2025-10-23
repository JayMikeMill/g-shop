// File: frontend/src/pages/admin/products-page/ProductOptionsEditor.tsx

import React, { useState } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button, Input, XButton, AnimatedSelect } from "@components/ui";
import type {
  Product,
  ProductOption,
  ProductOptionsPreset,
} from "shared/types";
import { useDataApi } from "@app/hooks";

const ProductOptionsForm: React.FC = () => {
  const { control, register, setValue, getValues } = useFormContext<Product>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const { productOptionsPresets } = useDataApi();
  const createPreset = productOptionsPresets.create();
  const deletePresetMutation = productOptionsPresets.delete();
  const { data: presetsData, refetch } = productOptionsPresets.getMany();
  const presets = presetsData?.data ?? [];

  const [saving, setSaving] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<
    ProductOptionsPreset | undefined
  >(undefined);

  // --- Add/Remove options ---
  const addOption = () => append({ name: "", values: [] });
  const removeOption = (i: number) => remove(i);

  // --- Handle preset selection ---
  const handlePresetSelect = (preset: ProductOptionsPreset) => {
    if (!preset.options?.length) return;
    setValue("options", preset.options);
    setSelectedPreset(preset);
  };

  // --- Handle preset deletion ---
  const handleDeletePreset = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this preset?")) return;

    try {
      await deletePresetMutation.mutateAsync(id);
      alert("Preset deleted successfully");
      refetch();
      if (selectedPreset?.id === id) setSelectedPreset(undefined);
    } catch (err: any) {
      alert("Failed to delete preset: " + err.message);
    }
  };

  // --- Save preset ---
  const handleSavePreset = async () => {
    const options = getValues("options");
    if (!options || options.length === 0) {
      alert("No options to save as preset.");
      return;
    }
    const name = prompt("Enter preset name:");
    if (!name) return;

    setSaving(true);
    try {
      await createPreset.mutateAsync({ name, options });
      alert("Preset saved successfully");
      refetch();
    } catch (err: any) {
      alert("Error saving preset: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  // --- Map presets for dropdown ---
  const dropdownItems = presets.map((preset) => ({
    value: preset,
    label: preset.name,
    render: (p: ProductOptionsPreset) => (
      <div className="flex justify-between items-center gap-2">
        <span className="flex-1 text-foreground font-normal">{p.name}</span>
        <XButton
          className="w-5 h-5"
          onClick={(e) => {
            e.stopPropagation();
            handleDeletePreset(p.id);
          }}
        />
      </div>
    ),
  }));

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Preset Dropdown */}
      <AnimatedSelect
        items={dropdownItems}
        onChange={handlePresetSelect}
        actionName="Select preset..."
        noItemsText="No option presets."
        className="mb-2"
      />

      {/* Options List */}
      {fields.map((opt, i) => (
        <div
          key={opt.id}
          className="flex flex-col gap-2 py-4 border-t border-border"
        >
          <div className="flex flex-wrap gap-2 items-center w-full">
            <Input
              type="text"
              className="flex-1"
              placeholder="Option Name"
              {...register(`options.${i}.name` as const)}
            />
            <XButton className="w-8 h-8" onClick={() => removeOption(i)} />
          </div>
          <div className="flex flex-wrap gap-2 items-center w-full">
            <Input
              type="text"
              placeholder="Values (comma-separated)"
              {...register(`options.${i}.values` as const, {
                setValueAs: (v) => {
                  if (Array.isArray(v)) return v;
                  if (typeof v === "string") {
                    const parsed = v
                      .split(",")
                      .map((x) => x.trim())
                      .filter(Boolean);
                    return v.endsWith(",") ? [...parsed, ""] : parsed;
                  }
                  return [];
                },
              })}
            />
          </div>
        </div>
      ))}

      {/* Bottom Buttons */}
      <div className="flex flex-wrap gap-2 w-full mt-auto">
        {fields.length > 0 && (
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

export default ProductOptionsForm;

//==========================================================
// Product Options Preset Select Component
//==========================================================

interface ProductOptionsPresetSelectProps {
  onSelect: (options: ProductOption[]) => void;
  className?: string;
}

export const ProductOptionsPresetSelect: React.FC<
  ProductOptionsPresetSelectProps
> = ({ onSelect, className }) => {
  const { productOptionsPresets } = useDataApi();

  // Query presets
  const { data: presetsData, refetch } = productOptionsPresets.getMany();
  const presets = presetsData?.data ?? [];

  // Delete mutation
  const deletePreset = productOptionsPresets.delete();

  // Track currently selected preset
  const [selectedPreset, setSelectedPreset] = useState<
    ProductOptionsPreset | undefined
  >(undefined);

  // Apply preset
  const handleApplyPreset = (preset: ProductOptionsPreset) => {
    if (!preset.options?.length) return;
    onSelect(preset.options);
    setSelectedPreset(preset);
  };

  // Delete preset
  const handleDeletePreset = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this preset?")) return;

    try {
      await deletePreset.mutateAsync(id);
      alert("Preset deleted successfully");
      refetch();
      if (selectedPreset?.id === id) setSelectedPreset(undefined);
    } catch (err: any) {
      alert("Failed to delete preset: " + err.message);
    }
  };

  // Map to AnimatedSelect format
  const dropdownItems = presets.map((preset) => ({
    value: preset,
    label: preset.name,
    render: (p: ProductOptionsPreset) => (
      <div className="flex justify-between items-center gap-2">
        <span className="flex-1 text-foreground font-normal">{p.name}</span>
        <XButton
          className="w-5 h-5"
          onClick={(e) => {
            e.stopPropagation();
            handleDeletePreset(p.id);
          }}
        />
      </div>
    ),
  }));

  return (
    <AnimatedSelect
      items={dropdownItems}
      onChange={handleApplyPreset}
      actionName="Select preset..."
      noItemsText="No option presets."
      className={`mb-2 ${className ?? ""}`}
    />
  );
};
