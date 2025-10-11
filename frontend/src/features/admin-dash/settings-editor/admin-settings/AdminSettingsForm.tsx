import React, { useEffect, useState } from "react";
import type { AdminSettings } from "@shared/settings";

// Editors
import AdminSettingsContactEditor from "./AdminSettingsContactEditor";
import AdminSettingsShippingEditor from "./AdminSettingsShippingEditor";
import AdminSettingsFeaturesEditor from "./AdminSettingsFeaturesEditor";
import AdminSettingsAnalyticsEditor from "./AdminSettingsAnalyticsEditor";

interface Props {
  settings: AdminSettings;
  onSave: (settings: AdminSettings) => void;
}

const AdminSettingsForm: React.FC<Props> = ({ settings, onSave }) => {
  const [formSettings, setFormSettings] = useState<AdminSettings>(settings);

  useEffect(() => {
    setFormSettings(settings);
  }, [settings]);

  const handleSave = () => {
    onSave(formSettings);
  };

  return (
    <div className="flex flex-row p-md w-full">
      <div className="flex flex-col gap-lg p-md w-1/2">
        <AdminSettingsContactEditor
          settings={formSettings}
          setSettings={setFormSettings}
        />
        <AdminSettingsShippingEditor
          settings={formSettings}
          setSettings={setFormSettings}
        />
      </div>

      <div className="flex flex-col gap-lg p-md w-1/2">
        <AdminSettingsFeaturesEditor
          settings={formSettings}
          setSettings={setFormSettings}
        />
        <AdminSettingsAnalyticsEditor
          settings={formSettings}
          setSettings={setFormSettings}
        />

        <button
          className="btn btn-primary mt-lg"
          type="button"
          onClick={handleSave}
        >
          Save Admin Settings
        </button>
      </div>
    </div>
  );
};

export default AdminSettingsForm;
