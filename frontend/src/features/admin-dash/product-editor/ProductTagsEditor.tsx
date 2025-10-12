import React, { useState, useEffect } from "react";
import { Button, XButton, TagBox, AnimatedSelect } from "@components/ui";
import type { Product, ProductTag, ProductTagPreset } from "@shared/types";
import { ProductTagDialog } from "./ProductTagDialog";
import { useDataApi } from "@api";

/* -------------------- TagPresetsDropdown -------------------- */
interface TagPresetsDropdownProps {
  onSelectPreset: (preset: ProductTagPreset) => void;
}

const TagPresetsDropdown: React.FC<TagPresetsDropdownProps> = ({
  onSelectPreset,
}) => {
  const { productTagsPresets } = useDataApi();

  // Queries
  const { data: presetsData, refetch } = productTagsPresets.getMany();
  const presets = presetsData?.data ?? [];

  // Mutations
  const createPresetMutation = productTagsPresets.create();
  const deletePresetMutation = productTagsPresets.delete();

  // Create preset state
  const [creating, setCreating] = useState(false);
  const [newTagName, setNewTagName] = useState("Tag");
  const [newTagColor, setNewTagColor] = useState("#e77919ff");
  const [newTagTextColor, setNewTagTextColor] = useState("#ffffff");

  // Selected preset (for dropdown)
  const [selectedPreset, setSelectedPreset] = useState<
    ProductTagPreset | undefined
  >(undefined);

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
    refetch();
  };

  const deletePreset = async (id?: string) => {
    if (!id) return;
    await deletePresetMutation.mutateAsync(id);
    refetch();
    // clear selection if deleted
    if (selectedPreset?.id === id) setSelectedPreset(undefined);
  };

  const handleSelect = (preset: ProductTagPreset) => {
    setSelectedPreset(preset);
    onSelectPreset(preset);
  };

  const dropdownItems = presets.map((p) => ({
    value: p,
    label: p.name,
    render: (preset: ProductTagPreset) => (
      <div className="flex gap-2 items-center w-auto cursor-pointer hover:bg-backgroundAlt">
        <TagBox
          className="w-full h-6 self-center"
          text={preset.name}
          color={preset.color ?? "accent"}
          textColor={preset.textColor ?? "primary-foreground"}
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
  }));

  return (
    <div className="relative flex items-center gap-2 w-full">
      <AnimatedSelect
        items={dropdownItems}
        value={selectedPreset}
        onChange={handleSelect}
        placeholder="Select tag..."
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
  const [localTags, setLocalTags] = useState<ProductTag[]>(product.tags ?? []);

  useEffect(() => {
    setLocalTags(product.tags ?? []);
  }, [product.id]);

  useEffect(() => {
    setProduct((prev) => ({ ...prev, tags: localTags }));
  }, [localTags]);

  const addTag = (preset: ProductTagPreset) => {
    if (!localTags.some((t) => t.name === preset.name)) {
      setLocalTags((prev) => [...prev, { ...preset, id: undefined }]);
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
              textColor={tag.textColor ?? "#fff"}
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
