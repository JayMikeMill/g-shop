import React from "react";
import { Input, NumberInput, Toggle, Label } from "@components/ui";
import type { SiteSettings } from "@shared/settings";

interface Props {
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
}

const SiteSettingsEcommerceEditor: React.FC<Props> = ({
  settings,
  setSettings,
}) => {
  const handleCarrierRateChange = (carrier: string, value: number) => {
    setSettings((prev) => ({
      ...prev,
      carrierShippingRates: {
        ...(prev.carrierShippingRates || {}),
        [carrier]: value,
      },
    }));
  };

  const handlePaymentMethodChange = (index: number, value: string) => {
    const newMethods = [...(settings.paymentMethods || [])];
    newMethods[index] = value;
    setSettings((prev) => ({ ...prev, paymentMethods: newMethods }));
  };

  return (
    <div className="flex flex-col gap-md">
      <div className="flex flex-col gap-md w-full sm:flex-row">
        <Label className="text-center w-full sm:w-1/2">
          Items Per Page
          <NumberInput
            decimals={0}
            value={settings.itemsPerPage ?? 10}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSettings((prev) => ({
                ...prev,
                itemsPerPage: parseInt(e.target.value),
              }))
            }
          />
        </Label>
        <Label className="text-center w-full sm:w-1/2">
          Max Cart Items
          <NumberInput
            decimals={0}
            value={settings.maxCartItems ?? 0}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSettings((prev) => ({
                ...prev,
                maxCartItems: parseInt(e.target.value),
              }))
            }
          />
        </Label>
      </div>

      <div className="flex flex-col gap-md w-full sm:flex-row">
        <Toggle
          className="w-full sm:w-1/2"
          checked={settings.enableReviews ?? false}
          onToggle={(v) =>
            setSettings((prev) => ({ ...prev, enableReviews: v }))
          }
        >
          {`Reviews ${settings.enableReviews ? "Enabled" : "Disabled"}`}
        </Toggle>
        <Toggle
          className="w-full sm:w-1/2"
          checked={settings.enableWishlist ?? false}
          onToggle={(v) =>
            setSettings((prev) => ({ ...prev, enableWishlist: v }))
          }
        >
          {`Wishlist ${settings.enableWishlist ? "Enabled" : "Disabled"}`}
        </Toggle>
      </div>
      {/* <Toggle
        checked={settings.enableCoupons ?? false}
        onToggle={(v) => setSettings((prev) => ({ ...prev, enableCoupons: v }))}
      >
        {`Coupons ${settings.enableCoupons ? "Enabled" : "Disabled"}`}
      </Toggle> */}

      <div className="flex flex-col gap-md w-full sm:flex-row">
        <Toggle
          className="w-full sm:w-1/2"
          checked={settings.enableGiftCards ?? false}
          onToggle={(v) =>
            setSettings((prev) => ({ ...prev, enableGiftCards: v }))
          }
        >
          {`Gift Cards ${settings.enableGiftCards ? "Enabled" : "Disabled"}`}
        </Toggle>

        <Toggle
          className="w-full sm:w-1/2"
          checked={settings.enableSubscriptions ?? false}
          onToggle={(v) =>
            setSettings((prev) => ({ ...prev, enableSubscriptions: v }))
          }
        >
          {`Subscriptions ${settings.enableSubscriptions ? "Enabled" : "Disabled"}`}
        </Toggle>
      </div>

      <Label>
        Default Currency
        <Input
          value={settings.defaultCurrency ?? ""}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              defaultCurrency: e.target.value,
            }))
          }
        />
      </Label>
      <Label>
        Tax Rate (%)
        <NumberInput
          style="PERCENT"
          value={settings.taxRate ?? 0}
          decimals={2}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSettings((prev) => ({
              ...prev,
              taxRate: parseFloat(e.target.value),
            }))
          }
        />
      </Label>
      <Label>
        Free Shipping Threshold
        <NumberInput
          style="CURRENCY"
          unitConversion={true}
          value={settings.freeShippingThreshold ?? 0}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSettings((prev) => ({
              ...prev,
              freeShippingThreshold: parseInt(e.target.value),
            }))
          }
        />
      </Label>

      <Label>
        Flat Shipping Rate
        <NumberInput
          style="CURRENCY"
          unitConversion={true}
          value={settings.flatShippingRate ?? 0}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSettings((prev) => ({
              ...prev,
              flatShippingRate: parseInt(e.target.value),
            }))
          }
        />
      </Label>

      {/* Carrier Shipping Rates */}
      {Object.entries(settings.carrierShippingRates || {}).map(
        ([carrier, rate]) => (
          <Label key={carrier}>
            {carrier} Rate (cents)
            <NumberInput
              value={rate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleCarrierRateChange(carrier, parseInt(e.target.value))
              }
            />
          </Label>
        )
      )}

      {/* Payment Methods */}
      {(settings.paymentMethods || []).map((method, index) => (
        <Label key={index}>
          Payment Method #{index + 1}
          <Input
            value={method}
            onChange={(e) => handlePaymentMethodChange(index, e.target.value)}
          />
        </Label>
      ))}

      <Label>
        Default Shipping Method
        <Input
          value={settings.defaultShippingMethod ?? ""}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              defaultShippingMethod: e.target.value,
            }))
          }
        />
      </Label>

      <Label>
        Default Payment Method
        <Input
          value={settings.defaultPaymentMethod ?? ""}
          onChange={(e) =>
            setSettings((prev) => ({
              ...prev,
              defaultPaymentMethod: e.target.value,
            }))
          }
        />
      </Label>
    </div>
  );
};

export default SiteSettingsEcommerceEditor;
