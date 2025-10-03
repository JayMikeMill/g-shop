import React, { useState, useEffect } from "react";

import { Button, XButton, TagBox, AnimatedSelect } from "@components/ui";

import type { Product, ProductTag, ProductTagPreset } from "@shared/types";

import { ProductTagDialog } from "./ProductTagDialog";
import { useApi } from "@api/useApi";

interface TagPresetsDropdownProps {
  onSelectPreset: (preset: ProductTagPreset) => void;
}

const TagPresetsDropdown: React.FC<TagPresetsDropdownProps> = ({
  onSelectPreset,
}) => {
  const { productTagsPresets } = useApi();

  // Queries
  const { data: presetsData, refetch } = productTagsPresets.getAll();
  const presets = presetsData?.data ?? [];

  // Mutations
  const createPresetMutation = productTagsPresets.create();
  const deletePresetMutation = productTagsPresets.delete();

  // Create preset state
  const [creating, setCreating] = useState(false);
  const [newTagName, setNewTagName] = useState("Tag");
  const [newTagColor, setNewTagColor] = useState("#e77919ff");
  const [newTagTextColor, setNewTagTextColor] = useState("#ffffff");

  const createPreset = async () => {
    if (!newTagName.trim()) return;
    await createPresetMutation.mutateAsync({
      name: newTagName.trim(),
      color: newTagColor,
      textColor: newTagTextColor,
    });
    setCreating(false);
    setNewTagName("");
    setNewTagColor("#bebebeff");
    setNewTagTextColor("#ffffff");
    refetch(); // refresh presets list
  };

  const deletePreset = async (id?: string) => {
    if (!id) return;
    await deletePresetMutation.mutateAsync(id);
    refetch();
  };

  const handleSelect = (preset: ProductTagPreset) => {
    onSelectPreset(preset);
  };

  const dropdownItems = presets.map((p) => ({
    value: p,
    render: (preset: ProductTagPreset) => (
      <div className="flex gap-2 items-center w-auto cursor-pointer hover:bg-backgroundAlt z-100">
        <TagBox
          className="w-full h-6 self-center"
          text={preset.name}
          color={preset.color}
          textColor={preset.textColor}
        />
        <XButton
          className="w-8 h-8"
          onClick={(e) => {
            e.stopPropagation();
            deletePreset(p.id);
          }}
        />
      </div>
    ),
    onClick: handleSelect,
  }));

  return (
    <div className="relative flex items-center gap-2 w-full">
      <AnimatedSelect
        items={dropdownItems}
        headerText="Select Tag..."
        noItemsText="No tag presets."
        className="w-full"
      />

      <Button onClick={() => setCreating(true)}>Create Tag</Button>

      <ProductTagDialog
        open={creating}
        name={newTagName}
        setName={setNewTagName}
        color={newTagColor}
        setColor={setNewTagColor}
        textColor={newTagTextColor}
        setTextColor={setNewTagTextColor}
        onClose={() => setCreating(false)}
        onSave={createPreset}
      />
    </div>
  );
};

/* -------------------- ProductTagsEditor -------------------- */
interface ProductTagsEditorProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  openInitially?: boolean;
}

const ProductTagsEditor: React.FC<ProductTagsEditorProps> = ({
  product,
  setProduct,
}) => {
  const [localTags, setLocalTags] = useState<ProductTag[]>(product.tags);

  useEffect(() => {
    setLocalTags(product.tags);
  }, [product.id]);

  useEffect(() => {
    setProduct((prev) => ({ ...prev, tags: localTags }));
  }, [localTags]);

  const addTag = (preset: ProductTagPreset) => {
    if (!localTags.some((t) => t.name === preset.name)) {
      setLocalTags((prev) => [...prev, preset]);
    }
  };

  const removeTag = (i: number) =>
    setLocalTags((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="flex flex-col">
      <TagPresetsDropdown onSelectPreset={addTag} />

      <div className="flex flex-wrap gap-2 mt-2">
        {localTags.map((tag, i) => (
          <div key={i} className="flex items-center gap-2">
            <TagBox
              color={tag.color || "#ccc"}
              text={tag.name}
              textColor={tag.textColor}
            >
              <XButton
                className="w-5 h-5"
                style={{
                  backgroundColor: tag.color || "#ccc",
                  color: tag.textColor || "#fff",
                }}
                onClick={() => removeTag(i)}
              />
            </TagBox>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTagsEditor;
