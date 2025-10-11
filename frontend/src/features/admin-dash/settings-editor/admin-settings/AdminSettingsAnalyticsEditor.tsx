import React from "react";
import { Input, Label } from "@components/ui";
import type { AdminSettings } from "@shared/settings";

interface Props {
  settings: AdminSettings;
  setSettings: React.Dispatch<React.SetStateAction<AdminSettings>>;
}

const AdminSettingsAnalyticsEditor: React.FC<Props> = ({
  settings,
  setSettings,
}) => {
  return (
    <div className="flex flex-col gap-md">
      <Label>
        Google Analytics ID
        <Input
          value={settings.googleAnalyticsID || ""}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              googleAnalyticsID: e.target.value,
            }))
          }
        />
      </Label>

      <Label>
        Facebook Pixel ID
        <Input
          value={settings.facebookPixelID || ""}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              facebookPixelID: e.target.value,
            }))
          }
        />
      </Label>

      <Label>
        Hotjar ID
        <Input
          value={settings.hotjarID || ""}
          onChange={(e) =>
            setSettings((prev) => ({ ...prev, hotjarID: e.target.value }))
          }
        />
      </Label>

      <Label>
        Custom Tracking Scripts (JSON Array)
        <Input
          value={
            settings.customTrackingScripts
              ? JSON.stringify(settings.customTrackingScripts)
              : ""
          }
          onChange={(e) => {
            try {
              setSettings((prev) => ({
                ...prev,
                customTrackingScripts: JSON.parse(e.target.value),
              }));
            } catch {}
          }}
        />
      </Label>
    </div>
  );
};

export default AdminSettingsAnalyticsEditor;
