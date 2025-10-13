import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Input, NumberInput, Toggle, Label } from "@components/ui";

const SiteSettingsEcommerceForm: React.FC = () => {
  const { register, control, watch, setValue } = useFormContext();
  const {
    fields: paymentMethodsFields,
    append: appendPaymentMethod,
    remove: removePaymentMethod,
  } = useFieldArray({
    control,
    name: "paymentMethods",
  });

  const carrierShippingRates = watch("carrierShippingRates") || {};

  return (
    <div className="flex flex-col gap-md">
      <div className="flex flex-col gap-md w-full sm:flex-row">
        <Label className="text-center w-full sm:w-1/2">
          Items Per Page
          <NumberInput
            variant="wholeNumber"
            controlProps={{
              control,
              name: "itemsPerPage",
              rules: { valueAsNumber: true },
            }}
          />
        </Label>
        <Label className="text-center w-full sm:w-1/2">
          Max Cart Items
          <NumberInput
            variant="wholeNumber"
            controlProps={{
              control,
              name: "maxCartItems",
              rules: { valueAsNumber: true },
            }}
          />
        </Label>
      </div>

      <div className="flex flex-col gap-md w-full sm:flex-row">
        <Toggle
          className="w-full sm:w-1/2"
          checked={watch("enableReviews") ?? false}
          onToggle={(v) => setValue("enableReviews", v)}
        >
          {`Reviews ${watch("enableReviews") ? "Enabled" : "Disabled"}`}
        </Toggle>
        <Toggle
          className="w-full sm:w-1/2"
          checked={watch("enableWishlist") ?? false}
          onToggle={(v) => setValue("enableWishlist", v)}
        >
          {`Wishlist ${watch("enableWishlist") ? "Enabled" : "Disabled"}`}
        </Toggle>
      </div>

      <div className="flex flex-col gap-md w-full sm:flex-row">
        <Toggle
          className="w-full sm:w-1/2"
          checked={watch("enableGiftCards") ?? false}
          onToggle={(v) => setValue("enableGiftCards", v)}
        >
          {`Gift Cards ${watch("enableGiftCards") ? "Enabled" : "Disabled"}`}
        </Toggle>
        <Toggle
          className="w-full sm:w-1/2"
          checked={watch("enableSubscriptions") ?? false}
          onToggle={(v) => setValue("enableSubscriptions", v)}
        >
          {`Subscriptions ${watch("enableSubscriptions") ? "Enabled" : "Disabled"}`}
        </Toggle>
      </div>

      <Label>
        Default Currency
        <Input {...register("defaultCurrency")} />
      </Label>
      <Label>
        Tax Rate (%)
        <NumberInput
          variant="percent"
          controlProps={{
            control,
            name: "taxRate",
            rules: { valueAsNumber: true },
          }}
        />
      </Label>
      <Label>
        Free Shipping Threshold
        <NumberInput
          variant="currency"
          controlProps={{
            control,
            name: "freeShippingThreshold",
            rules: { valueAsNumber: true },
          }}
        />
      </Label>
      <Label>
        Flat Shipping Rate
        <NumberInput
          variant="currency"
          controlProps={{
            control,
            name: "flatShippingRate",
            rules: { valueAsNumber: true },
          }}
        />
      </Label>

      {/* Payment Methods */}
      {paymentMethodsFields.map((field, index) => (
        <Label key={field.id}>
          Payment Method #{index + 1}
          <Input {...register(`paymentMethods.${index}`)} />
          <button type="button" onClick={() => removePaymentMethod(index)}>
            Remove
          </button>
        </Label>
      ))}
      <button type="button" onClick={() => appendPaymentMethod("")}>
        Add Payment Method
      </button>

      <Label>
        Default Shipping Method
        <Input {...register("defaultShippingMethod")} />
      </Label>
      <Label>
        Default Payment Method
        <Input {...register("defaultPaymentMethod")} />
      </Label>
    </div>
  );
};

export default SiteSettingsEcommerceForm;
