import React, { useEffect, useState } from "react";
import type { AdminSettings } from "@shared/settings";

// Editors
import AdminSettingsContactEditor from "./AdminSettingsContactEditor";
import AdminSettingsShippingOriginEditor from "./AdminSettingsShippingOrigenEditor";
import AdminSettingsFeaturesEditor from "./AdminSettingsFeaturesEditor";
import AdminSettingsAnalyticsEditor from "./AdminSettingsAnalyticsEditor";
import { AnimatedDropdownBox } from "@components/ui/custom/AnimatedDropdownBox";

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
    <div className="flex flex-col gap-sm w-full sm:flex-row sm:gap-lg">
      <div className="flex flex-col w-full gap-sm sm:gap-md">
        <AnimatedDropdownBox
          className=" gap-lg p-md w-full"
          title="Contact Settings"
          openInitially={true}
        >
          <AdminSettingsContactEditor
            settings={formSettings}
            setSettings={setFormSettings}
          />
        </AnimatedDropdownBox>
        <AnimatedDropdownBox
          className=" gap-lg p-md w-full"
          title="Shipping Origin"
          openInitially={true}
        >
          <AdminSettingsShippingOriginEditor
            settings={formSettings}
            setSettings={setFormSettings}
          />
        </AnimatedDropdownBox>
      </div>

      <div className="flex flex-col w-full">
        <AnimatedDropdownBox
          className=" gap-lg p-md w-full"
          title="Features Settings"
          openInitially={true}
        >
          <AdminSettingsFeaturesEditor
            settings={formSettings}
            setSettings={setFormSettings}
          />
        </AnimatedDropdownBox>
        <AnimatedDropdownBox
          className=" gap-lg p-md w-full"
          title="Analytics Settings"
          openInitially={true}
        >
          <AdminSettingsAnalyticsEditor
            settings={formSettings}
            setSettings={setFormSettings}
          />
        </AnimatedDropdownBox>
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
