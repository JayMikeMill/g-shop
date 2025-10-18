import React from "react";
import { useFormContext } from "react-hook-form";
import { ColorPickerButton, Label, NumberInput } from "@components/ui";
import { applyThemeColors } from "@features/site-settings/theme";

const colorKeys = [
  "backgroundColor",
  "surfaceColor",
  "foregroundColor",
  "primaryColor",
  "secondaryColor",
  "accentColor",
  "borderColor",
  "backgroundAltColor",
  "foregroundAltColor",
  "surfaceAltColor",
] as const;

const numberKeys = ["fontSize", "borderRadius", "shadowDepth"] as const;

const SiteSettingsThemeForm: React.FC = () => {
  const { control, watch, setValue } = useFormContext();
  const values = watch();

  applyThemeColors(
    {
      background: values?.backgroundColor || "#ffffff",
      backgroundAlt: values?.backgroundAltColor || "#f0f0f0",
      foreground: values?.foregroundColor || "#f5f5f5",
      foregroundAlt: values?.foregroundAltColor || "#333333",
      surface: values?.surfaceColor || "#ffffff",
      surfaceAlt: values?.surfaceAltColor || "#f5f5f5",
      primary: values?.primaryColor || "#59c2ff",
      secondary: values?.secondaryColor || "#6D28D9",
      border: values?.borderColor || "#e0e0e0",
      accent: values?.accentColor || "#10B981",
      destructive: "#EF4444",
    },
    {
      primary: true,
      secondary: true,
      accent: true,
      destructive: true,
    }
  );

  // Function to format label: remove "Color" and capitalize first letter
  const formatLabel = (key: string) =>
    key.replace(/Color/i, "").replace(/^./, (c) => c.toUpperCase());

  return (
    <div className="flex flex-col gap-md">
      <div className="grid grid-cols-2 gap-4">
        {colorKeys.map((key) => (
          <div key={key} className="flex flex-col items-center">
            <Label htmlFor={key}>{formatLabel(key)}</Label>

            {/* Hidden input to bind with react-hook-form */}
            <input type="hidden" name={key} value={values[key]} />

            <ColorPickerButton
              className="w-full"
              color={values[key]}
              onChange={(color) => setValue(key, color, { shouldDirty: true })}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-md mt-4">
        {numberKeys.map((key) => (
          <div key={key} className="flex flex-col">
            <Label htmlFor={key}>{formatLabel(key)}</Label>
            <NumberInput
              variant="wholeNumber"
              controlProps={{
                control,
                name: key,
                rules: { valueAsNumber: true },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiteSettingsThemeForm;
