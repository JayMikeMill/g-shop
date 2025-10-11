import React, { useEffect, useState } from "react";
import type { SiteSettings } from "@shared/settings";

// Editors
import SiteSettingsBasicInfoEditor from "./SiteSettingsBasicInfoEditor";
import SiteSettingsThemeEditor from "./SiteSettingsThemeEditor";
import SiteSettingsSocialEditor from "./SiteSettingsSocialEditor";
import SiteSettingsEcommerceEditor from "./SiteSettingsEcommerceEditor";

interface Props {
  settings: SiteSettings;
  onSave: (settings: SiteSettings) => void;
}

const SiteSettingsForm: React.FC<Props> = ({ settings, onSave }) => {
  const [formSettings, setFormSettings] = useState<SiteSettings>(settings);

  useEffect(() => {
    console.log("Settings updated:", settings);
    setFormSettings(settings);
  }, [settings]);

  const handleSave = () => {
    onSave(formSettings);
  };

  return (
    <div className="flex flex-row  p-md w-full">
      <div className="flex flex-col gap-lg p-md w-1/2">
        <SiteSettingsBasicInfoEditor
          settings={formSettings}
          setSettings={setFormSettings}
        />
        <SiteSettingsThemeEditor
          settings={formSettings}
          setSettings={setFormSettings}
        />
        <SiteSettingsSocialEditor
          settings={formSettings}
          setSettings={setFormSettings}
        />
      </div>
      <div className="flex flex-col gap-lg p-md w-1/2">
        <SiteSettingsEcommerceEditor
          settings={formSettings}
          setSettings={setFormSettings}
        />

        <button
          className="btn btn-primary mt-lg"
          type="button"
          onClick={handleSave}
        >
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default SiteSettingsForm;
