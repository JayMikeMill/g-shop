import React, { useEffect, useState, useRef } from "react";
import type {
  ProductOption,
  ProductOptionsPreset,
} from "@shared/types/Product";
import { useApi } from "@api/useApi";

interface OptionsPresetDropdownProps {
  localOptions: ProductOption[];
  setLocalOptions: React.Dispatch<React.SetStateAction<ProductOption[]>>;
  refreshKey?: any; // changes whenever a new preset is saved
}

const OptionsPresetDropdown: React.FC<OptionsPresetDropdownProps> = ({
  setLocalOptions,
  refreshKey,
}) => {
  const { productOptionsPresets } = useApi();

  const [presets, setPresets] = useState<ProductOptionsPreset[]>([]);
  const [loadingPresets, setLoadingPresets] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load presets
  useEffect(() => {
    let mounted = true;
    const loadPresets = async () => {
      setLoadingPresets(true);
      try {
        const { data } = await productOptionsPresets.getAll();
        const arr = Array.isArray(data)
          ? data
          : Array.isArray((data as { data?: ProductOptionsPreset[] })?.data)
            ? (data as { data: ProductOptionsPreset[] }).data
            : [];
        if (mounted) setPresets(arr as ProductOptionsPreset[]);
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
  }, [refreshKey]); // <-- refresh whenever refreshKey changes

  // Close dropdown on outside click
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

  const handleApplyPreset = (preset: ProductOptionsPreset) => {
    if (!preset.options || preset.options.length === 0) return;
    setLocalOptions(preset.options);
    setDropdownOpen(false);
  };

  const handleDeletePreset = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to delete this preset?")) return;
    try {
      await productOptionsPresets.delete(id);
      setPresets((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert("Failed to delete preset: " + err.message);
    }
  };

  return (
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
        className={`absolute z-10 mt-1 w-full bg-background border border-border rounded shadow-md max-h-60 overflow-y-auto transition-opacity duration-150 ${
          dropdownOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
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
  );
};

export default OptionsPresetDropdown;
