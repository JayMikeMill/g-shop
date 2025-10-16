import React from "react";
import { useFormContext } from "react-hook-form";
import { Input, Label, NumberInput } from "@components/ui";

const colorKeys = [
  "backgroundColor",
  "primaryColor",
  "secondaryColor",
  "accentColor",
  "textColor",
] as const;

const numberKeys = ["fontSize", "borderRadius", "shadowDepth"] as const;

const SiteSettingsThemeForm: React.FC = () => {
  const { register, control } = useFormContext();

  return (
    <div className="flex flex-col gap-md">
      {colorKeys.map((key) => (
        <div key={key} className="flex flex-col">
          <Label htmlFor={key}>{key}</Label>
          <Input id={key} type="color" {...register(key)} />
        </div>
      ))}

      {numberKeys.map((key) => (
        <div key={key} className="flex flex-col">
          <Label htmlFor={key}>{key}</Label>
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
  );
};

export default SiteSettingsThemeForm;
