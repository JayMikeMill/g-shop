import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  AnimatedSelect,
  Input,
  Label,
  NumberInput,
  Textarea,
} from "@components/ui";
import type { DiscountType, Product } from "shared/types";
import { getProductFinalPrice } from "shared/utils";

export const ProductInfoForm: React.FC = () => {
  const { register, getValues, watch, control, setValue } =
    useFormContext<Product>();

  const price = watch("price");
  const discount = watch("discount");
  const discountType = watch("discountType");

  const discountTypeSymbol = discountType === "PERCENTAGE" ? "%" : "$";

  useEffect(() => {
    setValue("finalPrice", getProductFinalPrice(getValues()));
  }, [price, discount, discountType, setValue, getValues]);
  return (
    <div className="flex flex-col flex-1 gap-md overflow-hidden p-0.5">
      <div className="flex flex-col">
        <Label>Name</Label>
        <Input placeholder="Product Name" {...register("name")} required />
      </div>
      <div className="flex flex-col">
        <Label>Long Name</Label>
        <Input placeholder="Product Name" {...register("longName")} required />
      </div>
      <div className="flex flex-col flex-1 gap-xs sm:gap-md">
        <div className="flex flex-col">
          <Label className="text-center">Price</Label>
          <NumberInput
            variant="currency"
            nonNullable
            controlProps={{
              control,
              name: "price",
              rules: { valueAsNumber: true },
            }}
          />
        </div>

        <div className="flex flex-1 flex-col">
          <Label className="text-center">Discount</Label>
          <div className="flex flex-1 flex-row gap-xs min-w-0">
            <NumberInput
              className="flex flex-1 pl-10"
              variant={discountTypeSymbol === "%" ? "percent" : "currency"}
              controlProps={{
                control,
                name: "discount",
                rules: { valueAsNumber: true },
              }}
            />
            <AnimatedSelect<DiscountType>
              className="flex-none w-10"
              items={[
                {
                  value: "FIXED_AMOUNT",
                  label: "$",
                  render: () => <span>$</span>,
                },
                {
                  value: "PERCENTAGE",
                  label: "%",
                  render: () => <span>%</span>,
                },
              ]}
              controlProps={{
                control,
                name: "discountType",
              }}
            />
          </div>
        </div>
        {/* Select (stays small / fixed) */}

        <div className="flex flex-col">
          <Label className="text-center">Final</Label>
          <NumberInput
            className="min-w-0 disabled:opacity-100 disabled:bg-background"
            readOnly
            variant="currency"
            controlProps={{
              control,
              name: "finalPrice",
              rules: { valueAsNumber: true },
            }}
          />
        </div>
      </div>

      <div className="flex flex-col">
        <Label>Description</Label>
        <Textarea
          {...register("description")}
          placeholder="Product Description"
          required
          className="px-md py-1 h-40 resize-none"
        />
      </div>
    </div>
  );
};

export default ProductInfoForm;
