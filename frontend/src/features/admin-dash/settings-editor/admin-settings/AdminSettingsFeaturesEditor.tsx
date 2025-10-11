import React from "react";
import { Toggle } from "@components/ui";
import type { AdminSettings } from "@shared/settings";

interface Props {
  settings: AdminSettings;
  setSettings: React.Dispatch<React.SetStateAction<AdminSettings>>;
}

const AdminSettingsFeaturesEditor: React.FC<Props> = ({
  settings,
  setSettings,
}) => {
  return (
    <div className="flex flex-col gap-md">
      <Toggle
        checked={settings.userRegistrationEnabled ?? false}
        onToggle={(v) =>
          setSettings((prev) => ({ ...prev, userRegistrationEnabled: v }))
        }
      >
        User Registration{" "}
        {settings.userRegistrationEnabled ? "Enabled" : "Disabled"}
      </Toggle>

      <Toggle
        checked={settings.orderProcessingEnabled ?? false}
        onToggle={(v) =>
          setSettings((prev) => ({ ...prev, orderProcessingEnabled: v }))
        }
      >
        Order Processing{" "}
        {settings.orderProcessingEnabled ? "Enabled" : "Disabled"}
      </Toggle>

      <Toggle
        checked={settings.maintenanceMode ?? false}
        onToggle={(v) =>
          setSettings((prev) => ({ ...prev, maintenanceMode: v }))
        }
      >
        Maintenance Mode {settings.maintenanceMode ? "Enabled" : "Disabled"}
      </Toggle>

      <Toggle
        checked={settings.siteOpen ?? true}
        onToggle={(v) => setSettings((prev) => ({ ...prev, siteOpen: v }))}
      >
        Site Open {settings.siteOpen ? "Yes" : "No"}
      </Toggle>
    </div>
  );
};

export default AdminSettingsFeaturesEditor;
