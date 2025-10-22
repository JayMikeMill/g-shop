import React, { useState } from "react";
import {
  Button,
  XButton,
  TagBox,
  AnimatedSelect,
  AnimatedDialog,
  Label,
  Input,
  ColorPickerButton,
} from "@components/ui";
import type { Product, ProductTagPreset } from "shared/types";
import { useDataApi } from "@api";
import { useFieldArray, useFormContext } from "react-hook-form";

/* -------------------- ProductTagsEditor -------------------- */
const ProductTagsForm: React.FC = () => {
  const { control } = useFormContext<Product>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  // Called when user selects a preset from dropdown
  const addTag = (preset: ProductTagPreset) => {
    // Prevent duplicates by name
    if (!fields.some((t) => t.name === preset.name)) {
      append({ ...preset, id: undefined });
    }
  };

  const removeTag = (index: number) => remove(index);

  return (
    <div className="flex flex-col">
      <TagPresetsSelect onSelectPreset={addTag} />

      <div className="flex flex-wrap gap-2 mt-2">
        {fields.map((tag, i) => (
          <div key={tag.id ?? i} className="flex items-center gap-2">
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

export default ProductTagsForm;

//==========================================================
// Product Tag Presets Selecyt
//==========================================================

interface TagPresetsSelectProps {
  onSelectPreset: (preset: ProductTagPreset) => void;
}

const TagPresetsSelect: React.FC<TagPresetsSelectProps> = ({
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
      <div className="flex gap-2 items-center w-auto cursor-pointer">
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
        onChange={handleSelect}
        actionName="Select tag..."
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

//==========================================================
// Product Tag Dialog
//==========================================================

interface ProductTagDialogProps {
  name: string;
  setName: (value: string) => void;
  color: string;
  textColor: string;
  setColor: (value: string) => void;
  setTextColor: (value: string) => void;
  open: boolean; // parent controls visibility
  onClose: () => void;
  onSave: () => void;
}

export const ProductTagDialog: React.FC<ProductTagDialogProps> = ({
  name = "tag",
  setName,
  color = "#aabbcc",
  textColor = "#ffffff",
  setColor,
  setTextColor,
  open,
  onClose,
  onSave,
}) => {
  return (
    <AnimatedDialog
      showHeader={false}
      open={open}
      onClose={onClose}
      onEnter={onSave} // handle Enter key
      className="py-4 px-6 text-text rounded-2xl shadow-xl w-80 flex flex-col gap-md"
    >
      <h3 className="text-lg font-semibold text-center">Create Tag Preset</h3>

      <div className="flex gap-2">
        <ColorPickerButton
          color={color}
          onChange={setColor}
          className="w-12 h-8 rounded-md border border-gray-400 shadow-sm"
        />
        <ColorPickerButton
          color={textColor}
          onChange={setTextColor}
          className="w-12 h-8 rounded-md border border-gray-400 shadow-sm"
        />
        <Input
          type="text"
          placeholder="Tag Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-2 py-1 w-full h-8 text-center"
        />
      </div>

      <div className="flex flex-row gap-2 items-center justify-center">
        <Label className="flex-row">Tag Preview: </Label>
        <TagBox
          className="w-1/2 h-8 self-center"
          text={name || "Preview"}
          color={color}
          textColor={textColor}
        />
      </div>

      <div className="flex gap-2 justify-center">
        <Button variant="outline" className="w-1/2" onClick={onClose}>
          Cancel
        </Button>
        <Button className="w-1/2" onClick={onSave}>
          Save
        </Button>
      </div>
    </AnimatedDialog>
  );
};
