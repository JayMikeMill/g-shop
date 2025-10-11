import React, { useEffect, useState } from "react";
import type { SiteSettings } from "@shared/settings";

// Editors
import SiteSettingsBasicInfoEditor from "./SiteSettingsBasicInfoEditor";
import SiteSettingsThemeEditor from "./SiteSettingsThemeEditor";
import SiteSettingsSocialEditor from "./SiteSettingsSocialEditor";
import SiteSettingsEcommerceEditor from "./SiteSettingsEcommerceEditor";
import { AnimatedDropdownBox } from "@components/ui/custom/AnimatedDropdownBox";

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
    <div className="flex flex-col gap-sm w-full sm:flex-row sm:gap-lg">
      <div className="flex flex-col w-full gap-sm sm:gap-md">
        <AnimatedDropdownBox
          className=" gap-lg p-md w-full"
          title="Basic Settings"
          openInitially={true}
        >
          <SiteSettingsBasicInfoEditor
            settings={formSettings}
            setSettings={setFormSettings}
          />
        </AnimatedDropdownBox>
        <AnimatedDropdownBox
          className=" gap-lg p-md w-full"
          title="Theme Settings"
          openInitially={true}
        >
          <SiteSettingsThemeEditor
            settings={formSettings}
            setSettings={setFormSettings}
          />
        </AnimatedDropdownBox>

        <AnimatedDropdownBox
          className=" gap-lg p-md w-full"
          title="Social Media Settings"
          openInitially={true}
        >
          <SiteSettingsSocialEditor
            settings={formSettings}
            setSettings={setFormSettings}
          />
        </AnimatedDropdownBox>
      </div>
      <AnimatedDropdownBox
        className=" gap-lg p-md w-full"
        title="E-Commerce Settings"
        openInitially={true}
      >
        <div className="flex flex-col h-auto">
          <SiteSettingsEcommerceEditor
            settings={formSettings}
            setSettings={setFormSettings}
          />
        </div>
      </AnimatedDropdownBox>
      {/* <button
        className="btn btn-primary mt-lg"
        type="button"
        onClick={handleSave}
      >
        Save Settings
      </button> */}
    </div>
  );
};

export default SiteSettingsForm;
