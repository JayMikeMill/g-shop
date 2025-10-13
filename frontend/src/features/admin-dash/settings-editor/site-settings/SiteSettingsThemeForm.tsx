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
        <Label key={key}>
          {key}
          <Input type="color" {...register(key)} />
        </Label>
      ))}
      {numberKeys.map((key) => (
        <Label key={key}>
          {key}
          <NumberInput
            variant="wholeNumber"
            controlProps={{
              control,
              name: key,
              rules: { valueAsNumber: true },
            }}
          />
        </Label>
      ))}
    </div>
  );
};

export default SiteSettingsThemeForm;
