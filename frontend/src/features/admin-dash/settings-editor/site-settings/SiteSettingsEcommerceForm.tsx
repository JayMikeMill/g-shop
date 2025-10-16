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
        <div className="flex flex-col w-full sm:w-1/2">
          <Label>Items Per Page</Label>
          <NumberInput
            variant="wholeNumber"
            controlProps={{
              control,
              name: "itemsPerPage",
              rules: { valueAsNumber: true },
            }}
          />
        </div>
        <div className="flex flex-col w-full sm:w-1/2">
          <Label>Max Cart Items</Label>
          <NumberInput
            variant="wholeNumber"
            controlProps={{
              control,
              name: "maxCartItems",
              rules: { valueAsNumber: true },
            }}
          />
        </div>
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
          {`Subscriptions ${
            watch("enableSubscriptions") ? "Enabled" : "Disabled"
          }`}
        </Toggle>
      </div>

      <div className="flex flex-col">
        <Label>Default Currency</Label>
        <Input {...register("defaultCurrency")} />
      </div>

      <div className="flex flex-col">
        <Label>Tax Rate (%)</Label>
        <NumberInput
          variant="percent"
          controlProps={{
            control,
            name: "taxRate",
            rules: { valueAsNumber: true },
          }}
        />
      </div>

      <div className="flex flex-col">
        <Label>Free Shipping Threshold</Label>
        <NumberInput
          variant="currency"
          controlProps={{
            control,
            name: "freeShippingThreshold",
            rules: { valueAsNumber: true },
          }}
        />
      </div>

      <div className="flex flex-col">
        <Label>Flat Shipping Rate</Label>
        <NumberInput
          variant="currency"
          controlProps={{
            control,
            name: "flatShippingRate",
            rules: { valueAsNumber: true },
          }}
        />
      </div>

      {/* Payment Methods */}
      {paymentMethodsFields.map((field, index) => (
        <div key={field.id} className="flex flex-col">
          <Label>Payment Method #{index + 1}</Label>
          <Input {...register(`paymentMethods.${index}`)} />
          <button
            type="button"
            onClick={() => removePaymentMethod(index)}
            className="text-sm text-destructive mt-1"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => appendPaymentMethod("")}
        className="self-start mt-1 text-sm text-accent"
      >
        Add Payment Method
      </button>

      <div className="flex flex-col">
        <Label>Default Shipping Method</Label>
        <Input {...register("defaultShippingMethod")} />
      </div>

      <div className="flex flex-col">
        <Label>Default Payment Method</Label>
        <Input {...register("defaultPaymentMethod")} />
      </div>
    </div>
  );
};

export default SiteSettingsEcommerceForm;
