import React from "react";
import { Input, Label } from "@components/ui";
import type { SiteSettings } from "@shared/settings";

interface Props {
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
}

const SiteSettingsSocialEditor: React.FC<Props> = ({
  settings,
  setSettings,
}) => {
  const handles = [
    "facebookHandle",
    "twitterHandle",
    "instagramHandle",
    "linkedinHandle",
    "youtubeHandle",
    "tiktokHandle",
    "pinterestHandle",
  ] as const;

  return (
    <div className="flex flex-col gap-md">
      {handles.map((h) => (
        <Label key={h}>
          {h}
          <Input
            value={settings[h] || ""}
            onChange={(e) =>
              setSettings((prev) => ({ ...prev, [h]: e.target.value }))
            }
          />
        </Label>
      ))}

      <Label>
        Other Social Handles (JSON)
        <Input
          value={
            settings.otherSocialHandles
              ? JSON.stringify(settings.otherSocialHandles)
              : ""
          }
          onChange={(e) => {
            try {
              setSettings((prev) => ({
                ...prev,
                otherSocialHandles: JSON.parse(e.target.value),
              }));
            } catch {}
          }}
        />
      </Label>
    </div>
  );
};

export default SiteSettingsSocialEditor;
