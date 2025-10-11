import React from "react";
import { Input, Label, NumberInput } from "@components/ui";
import type { SiteSettings } from "@shared/settings";

interface Props {
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
}

const SiteSettingsThemeEditor: React.FC<Props> = ({
  settings,
  setSettings,
}) => (
  <div className="flex flex-col gap-md">
    {[
      "backgroundColor",
      "primaryColor",
      "secondaryColor",
      "accentColor",
      "textColor",
    ].map((key) => (
      <Label key={key}>
        {key}
        <Input
          type="color"
          value={(settings as any)[key] || "#000000"}
          onChange={(e) =>
            setSettings((prev) => ({ ...prev, [key]: e.target.value }))
          }
        />
      </Label>
    ))}

    {["fontSize", "borderRadius", "shadowDepth"].map((key) => (
      <NumberInput
        key={key}
        decimals={0}
        value={(settings as any)[key] || ""}
        onChange={(value) => setSettings((prev) => ({ ...prev, [key]: value }))}
      />
    ))}
  </div>
);

export default SiteSettingsThemeEditor;
