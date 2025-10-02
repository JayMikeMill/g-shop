import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { AnimatedDialog, Button, Input, TagBox } from "@components/ui";
import { Label } from "@radix-ui/react-label";

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
  name,
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
      className="py-4 px-6 text-text rounded-2xl shadow-xl w-80 flex flex-col gap-sm"
    >
      <h3 className="text-lg font-semibold text-center pb-4">
        Create Tag Preset
      </h3>

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
          className="px-2 py-1 w-full"
        />
      </div>

      <div className="flex flex-row gap-2 items-center justify-center">
        <Label className="flex-row">Tag Preview: </Label>
        <TagBox
          className="w-1/2 h-8 self-center"
          text={name || "Tag Preview"}
          color={color}
          textColor={textColor}
        />
      </div>

      <div className="flex gap-2 justify-center">
        <Button type="button" className="w-1/2" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" className="w-1/2" onClick={onSave}>
          Save
        </Button>
      </div>
    </AnimatedDialog>
  );
};

interface ColorPickerButtonProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

export function ColorPickerButton({
  color,
  onChange,
  className,
}: ColorPickerButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* The button */}
      <Button
        onClick={() => setOpen(true)}
        className={className}
        style={{ backgroundColor: color }}
      />

      {/* Dialog */}
      <AnimatedDialog
        showHeader={false}
        open={open}
        onClose={() => setOpen(false)}
        className="p-2"
      >
        <div className="flex flex-col items-center">
          <div className="text-text font-semibold mb-2 text-lg">
            Select Color
          </div>
          <HexColorPicker color={color} onChange={onChange} />

          <Input
            type="text"
            value={color}
            onFocus={(e) => e.target.select()}
            onChange={(e) => onChange(e.target.value)}
            className="px-2 py-1 w-auto mt-2 text-center"
          />
          <Button className="w-auto mt-2" onClick={() => setOpen(false)}>
            Select Color
          </Button>
        </div>
      </AnimatedDialog>
    </>
  );
}
