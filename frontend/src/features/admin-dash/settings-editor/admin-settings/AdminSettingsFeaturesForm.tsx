import React from "react";
import { useFormContext } from "react-hook-form";
import { Toggle } from "@components/ui";
import type { AdminSettings } from "shared/settings";

const AdminSettingsFeaturesForm: React.FC = () => {
  const { setValue, watch } = useFormContext<AdminSettings>();
  const userRegistrationEnabled = watch("userRegistrationEnabled");
  const orderProcessingEnabled = watch("orderProcessingEnabled");
  const maintenanceMode = watch("maintenanceMode");
  const siteOpen = watch("siteOpen");

  return (
    <div className="flex flex-col gap-md">
      <Toggle
        checked={!!userRegistrationEnabled}
        onToggle={(v) => setValue("userRegistrationEnabled", v)}
      >
        User Registration {userRegistrationEnabled ? "Enabled" : "Disabled"}
      </Toggle>
      <Toggle
        checked={!!orderProcessingEnabled}
        onToggle={(v) => setValue("orderProcessingEnabled", v)}
      >
        Order Processing {orderProcessingEnabled ? "Enabled" : "Disabled"}
      </Toggle>
      <Toggle
        checked={!!maintenanceMode}
        onToggle={(v) => setValue("maintenanceMode", v)}
      >
        Maintenance Mode {maintenanceMode ? "Enabled" : "Disabled"}
      </Toggle>
      <Toggle
        checked={siteOpen ?? true}
        onToggle={(v) => setValue("siteOpen", v)}
      >
        Site Open {siteOpen ? "Yes" : "No"}
      </Toggle>
    </div>
  );
};

export default AdminSettingsFeaturesForm;
