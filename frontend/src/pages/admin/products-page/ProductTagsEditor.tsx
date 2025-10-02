import React, { useEffect, useState } from "react";

import { Button, TagBox, AnimatedSelect } from "@components/ui";

import type {
  Product,
  ProductTag,
  ProductTagPreset,
} from "@shared/types/Product";

import { ProductTagDialog } from "./ProductTagDialog";

import { useApi } from "@api/useApi";

interface TagPresetsDropdownProps {
  onSelectPreset: (preset: ProductTagPreset) => void; // notify main component
}

const TagPresetsDropdown: React.FC<TagPresetsDropdownProps> = ({
  onSelectPreset,
}) => {
  const { productTagsPresets } = useApi();
  const [presets, setPresets] = useState<ProductTagPreset[]>([]);
  const [creating, setCreating] = useState(false);

  const [newTagName, setNewTagName] = useState("");
  const [newTagColor, setNewTagColor] = useState("#000000");
  const [newTagTextColor, setNewTagTextColor] = useState("#ffffff");

  // Load presets
  useEffect(() => {
    (async () => {
      try {
        const res = await productTagsPresets.getAll();
        setPresets(res.data);
      } catch (err) {
        console.error("Error loading tag presets", err);
      }
    })();
  }, []);

  // Delete preset
  const deletePreset = async (id?: string) => {
    if (!id) return;
    try {
      await productTagsPresets.delete(id);
      setPresets((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting tag preset", err);
    }
  };

  // Create preset
  const createPreset = async () => {
    if (!newTagName.trim()) return;
    try {
      const created = await productTagsPresets.create({
        name: newTagName.trim(),
        color: newTagColor,
        textColor: newTagTextColor,
      });
      setPresets((prev) => [...prev, created]);
      setCreating(false);
      setNewTagName("");
      setNewTagColor("#bebebeff");
      setNewTagTextColor("#ffffff");
    } catch (err) {
      console.error("Error creating tag preset", err);
    }
  };

  const handleSelect = (preset: ProductTagPreset) => {
    onSelectPreset(preset);
  };

  // Map presets to AnimatedDropdownBox items
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
        <Button
          variant={"xicon"}
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
    <div className="relative flex items-center gap-2 w-3/4">
      {/* Dropdown */}
      <AnimatedSelect
        items={dropdownItems}
        headerText="Select Tag..."
        noItemsText="No tag presets."
        className="w-full"
      />

      {/* Create Tag Button */}
      <Button onClick={() => setCreating(true)}>Create Tag</Button>

      {/* Create Tag Dialog */}
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

/* -------------------- 3. ProductTagsEditor Component -------------------- */
interface ProductTagsEditorProps {
  product: Product;
  setProduct: React.Dispatch<React.SetStateAction<Product>>;
  openInitially?: boolean; // parent controls visibility
}

const ProductTagsEditor: React.FC<ProductTagsEditorProps> = ({
  product,
  setProduct,
}) => {
  const [localTags, setLocalTags] = useState<ProductTag[]>(product.tags);

  // Sync local tags with product
  useEffect(() => {
    setLocalTags(product.tags);
  }, [product.id]);

  useEffect(
    () => setProduct((prev) => ({ ...prev, tags: localTags })),
    [localTags]
  );

  const addTag = (preset: ProductTagPreset) => {
    if (!localTags.some((t) => t.name === preset.name)) {
      setLocalTags((prev) => [...prev, preset]);
    }
  };

  const removeTag = (i: number) =>
    setLocalTags((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="flex flex-col px-2">
      <TagPresetsDropdown onSelectPreset={addTag} />

      <div className="flex flex-wrap gap-2 mt-2">
        {localTags.map((tag, i) => (
          <div key={i} className="flex items-center gap-2">
            <TagBox
              color={tag.color || "#ccc"}
              text={tag.name}
              textColor={tag.textColor}
            >
              <Button
                variant={"xicon"}
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
