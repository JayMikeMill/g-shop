import React from "react";
import { Input, NumberInput, Label } from "@components/ui";
import type { AdminSettings } from "@shared/settings";

interface Props {
  settings: AdminSettings;
  setSettings: React.Dispatch<React.SetStateAction<AdminSettings>>;
}

const AdminSettingsShippingEditor: React.FC<Props> = ({
  settings,
  setSettings,
}) => {
  const handleCarrierRateChange = (carrier: string, value: number) => {
    setSettings((prev) => ({
      ...prev,
      carrierRates: { ...(prev.carrierRates || {}), [carrier]: value },
    }));
  };

  return (
    <div className="flex flex-col gap-md">
      <Label>
        Default Shipping Method
        <Input
          value={settings.defaultShippingMethod || ""}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              defaultShippingMethod: e.target.value,
            }))
          }
        />
      </Label>

      <Label>
        Default Shipping Rate (cents)
        <NumberInput
          value={settings.defaultShippingRate || 0}
          decimals={0}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              defaultShippingRate: parseInt(e.target.value),
            }))
          }
        />
      </Label>

      <Label>
        Free Shipping Threshold (cents)
        <NumberInput
          value={settings.freeShippingThreshold || 0}
          decimals={0}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              freeShippingThreshold: parseInt(e.target.value),
            }))
          }
        />
      </Label>

      {/* Carrier Rates */}
      {Object.entries(settings.carrierRates || {}).map(([carrier, rate]) => (
        <Label key={carrier}>
          {carrier} Rate (cents)
          <NumberInput
            value={rate}
            decimals={0}
            onChange={(e) =>
              handleCarrierRateChange(carrier, parseInt(e.target.value))
            }
          />
        </Label>
      ))}
    </div>
  );
};

export default AdminSettingsShippingEditor;
