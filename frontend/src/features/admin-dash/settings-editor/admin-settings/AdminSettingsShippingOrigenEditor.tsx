import React from "react";
import type { AdminSettings } from "@shared/settings";
import AddressForm from "@components/ui/custom/AddressForm";

interface Props {
  settings: AdminSettings;
  setSettings: React.Dispatch<React.SetStateAction<AdminSettings>>;
}

const AdminSettingsShippingOriginEditor: React.FC<Props> = ({
  settings,
  setSettings,
}) => {
  return (
    <div className="flex flex-col gap-md">
      <AddressForm
        address={settings.shippingOrigin}
        setAddress={(address) =>
          setSettings((s) => ({ ...s, shippingOrigin: address }))
        }
      />
    </div>
  );
};

export default AdminSettingsShippingOriginEditor;
