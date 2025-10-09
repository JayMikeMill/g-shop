import React, { useState } from "react";
import type { ProductOption, ProductOptionsPreset } from "@shared/types";
import { XButton, AnimatedSelect } from "@components/ui"; // adjust path if needed
import { useApi } from "@api/useApi";

interface OptionsPresetDropdownProps {
  setLocalOptions: React.Dispatch<React.SetStateAction<ProductOption[]>>;
  className?: string;
}

const OptionsPresetDropdown: React.FC<OptionsPresetDropdownProps> = ({
  setLocalOptions,
  className,
}) => {
  const { productOptionsPresets } = useApi();

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
    setLocalOptions(preset.options);
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
      value={selectedPreset}
      onChange={handleApplyPreset}
      placeholder="Select preset..."
      noItemsText="No option presets."
      className={`mb-2 ${className ?? ""}`}
    />
  );
};

export default OptionsPresetDropdown;
