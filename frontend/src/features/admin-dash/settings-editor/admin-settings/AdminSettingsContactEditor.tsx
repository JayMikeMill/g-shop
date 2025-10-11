import React from "react";
import { Input, Label } from "@components/ui";
import type { AdminSettings } from "@shared/settings";

interface Props {
  settings: AdminSettings;
  setSettings: React.Dispatch<React.SetStateAction<AdminSettings>>;
}

const AdminSettingsContactEditor: React.FC<Props> = ({
  settings,
  setSettings,
}) => {
  return (
    <div className="flex flex-col gap-md">
      <Label>
        Admin Email
        <Input
          value={settings.adminEmail || ""}
          onChange={(e) =>
            setSettings((prev) => ({ ...prev, adminEmail: e.target.value }))
          }
        />
      </Label>

      <Label>
        Admin Phone
        <Input
          value={settings.adminPhone || ""}
          onChange={(e) =>
            setSettings((prev) => ({ ...prev, adminPhone: e.target.value }))
          }
        />
      </Label>

      <Label>
        Super Admin Emails (JSON)
        <Input
          value={
            settings.superAdminEmails
              ? JSON.stringify(settings.superAdminEmails)
              : ""
          }
          onChange={(e) => {
            try {
              setSettings((prev) => ({
                ...prev,
                superAdminEmails: JSON.parse(e.target.value),
              }));
            } catch {}
          }}
        />
      </Label>
    </div>
  );
};

export default AdminSettingsContactEditor;
