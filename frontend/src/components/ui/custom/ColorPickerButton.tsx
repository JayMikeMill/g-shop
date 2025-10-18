import { useState, useEffect, useRef } from "react";
import { Button } from "../primitives/Button";
import { Input } from "../primitives/Input";
import { AnimatedDialog } from "./AnimatedDialog";
import { HexColorPicker } from "react-colorful";

interface ColorPickerButtonProps {
  color: string; // always a valid 6-digit hex
  onChange: (color: string) => void; // only receives valid 6-digit hex
  className?: string;
}

export function ColorPickerButton({
  color,
  onChange,
  className,
}: ColorPickerButtonProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(color);

  const originalColorRef = useRef(color);

  useEffect(() => {
    setInputValue(color);
  }, [color]);

  const isValidHex6 = (val: string) => /^#[0-9A-Fa-f]{6}$/.test(val);

  const handleInputChange = (val: string) => {
    if (!val.startsWith("#")) val = "#" + val;
    val =
      "#" +
      val
        .slice(1)
        .replace(/[^0-9A-Fa-f]/g, "")
        .slice(0, 6);
    setInputValue(val);
    if (isValidHex6(val)) onChange(val);
  };

  const handlePickerChange = (val: string) => {
    setInputValue(val);
    onChange(val);
  };

  const handleOpen = () => {
    originalColorRef.current = color; // save original
    setOpen(true);
  };

  const handleCancel = () => {
    // revert to original color
    onChange(originalColorRef.current);
    setInputValue(originalColorRef.current);
    setOpen(false);
  };

  const handleConfirm = () => {
    // just close, keep current color
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        className={"border " + className}
        style={{ backgroundColor: color }}
      />

      <AnimatedDialog
        showHeader={false}
        open={open}
        onClose={handleCancel} // close via overlay or X triggers cancel
        className="p-2"
      >
        <div className="flex flex-col items-center">
          <div className="text-text font-semibold mb-2 text-lg">
            Select Color
          </div>

          <HexColorPicker color={color} onChange={handlePickerChange} />

          <Input
            type="text"
            value={inputValue}
            onFocus={(e) => e.target.select()}
            onChange={(e) => handleInputChange(e.target.value)}
            className="px-2 py-1 w-auto mt-2 text-center font-mono"
            style={{
              color: "#fff",
              background: isValidHex6(inputValue) ? inputValue : "#ffffff",
              textShadow: "0 0 5px rgba(0,0,0,1)",
            }}
          />

          <div className="flex gap-2 mt-2">
            <Button className="w-auto" onClick={handleConfirm}>
              Select Color
            </Button>
          </div>
        </div>
      </AnimatedDialog>
    </>
  );
}
