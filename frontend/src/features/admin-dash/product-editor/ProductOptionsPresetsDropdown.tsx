import React from "react";

import type { ProductOption, ProductOptionsPreset } from "@shared/types";

import { XButton, AnimatedSelect } from "@components/ui"; // adjust path

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

  // 1️⃣ Fetch presets via useQuery (hook must be top-level)
  const { data: presetsData, refetch } = productOptionsPresets.getMany();

  const presets = presetsData?.data ?? [];

  // 2️⃣ Delete mutation hook
  const deletePreset = productOptionsPresets.delete();

  // 3️⃣ Apply preset
  const handleApplyPreset = (preset: ProductOptionsPreset) => {
    if (!preset.productOptions || preset.productOptions.length === 0) return;
    setLocalOptions(preset.productOptions);
  };

  // 4️⃣ Delete preset
  const handleDeletePreset = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this preset?")) return;

    try {
      // ✅ use mutateAsync from the mutation hook
      await deletePreset.mutateAsync(id);
      alert("Preset deleted successfully");
      refetch(); // <-- trigger refresh
      // No need to manually remove from state; useCRUD invalidates the getMany query
    } catch (err: any) {
      alert("Failed to delete preset: " + err.message);
    }
  };

  // 5️⃣ Map presets to dropdown items
  const dropdownItems = presets.map((preset) => ({
    value: preset,
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
    onClick: handleApplyPreset,
  }));

  return (
    <AnimatedSelect
      items={dropdownItems}
      headerText="Select Preset..."
      noItemsText="No option presets."
      className={`mb-2 ${className}`}
    />
  );
};

export default OptionsPresetDropdown;
