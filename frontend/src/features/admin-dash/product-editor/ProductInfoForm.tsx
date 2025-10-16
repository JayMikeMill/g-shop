import React from "react";
import { useFormContext } from "react-hook-form";
import {
  AnimatedSelect,
  Input,
  Label,
  NumberInput,
  Textarea,
} from "@components/ui";
import type { DiscountType, Product } from "@shared/types";

export const ProductInfoForm: React.FC = () => {
  const { register, watch, control } = useFormContext<Product>();

  const discountType = watch("discountType");
  const discountTypeSymbol = discountType === "PERCENTAGE" ? "%" : "$";

  return (
    <div className="flex flex-col flex-1 gap-md overflow-hidden p-0.5">
      <div className="flex flex-col">
        <Label>Name</Label>
        <Input placeholder="Product Name" {...register("name")} required />
      </div>
      <div className="flex gap-md justify-left">
        <div className="flex flex-col w-32">
          <Label>Price</Label>
          <NumberInput
            variant="currency"
            controlProps={{
              control,
              name: "price",
              rules: { valueAsNumber: true },
            }}
          />
        </div>
        <div className="flex items-end gap-sm">
          <div className="flex flex-col w-32">
            <Label>Discount</Label>
            <NumberInput
              variant={discountTypeSymbol === "%" ? "percent" : "currency"}
              className="text-center w-32"
              controlProps={{
                control,
                name: "discount",
                rules: { valueAsNumber: true },
              }}
            />
          </div>
          <AnimatedSelect<DiscountType>
            items={[
              {
                value: "FIXED_AMOUNT",
                label: "$",
                render: () => <span>$</span>,
              },
              { value: "PERCENTAGE", label: "%", render: () => <span>%</span> },
            ]}
            controlProps={{
              control,
              name: "discountType",
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
