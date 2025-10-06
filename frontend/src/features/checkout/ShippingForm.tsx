import { useEffect } from "react";
import {
  ShippingCarrier,
  ShippingMethod,
  type OrderShippingInfo,
} from "@my-store/shared";
import { z } from "zod";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Label } from "@components/ui";

// helper to convert enum objects to Zod enums
const zEnum = <T extends Record<string, string>>(obj: T) =>
  z.enum(Object.values(obj) as [string, ...string[]]);

const shippingSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  method: zEnum(ShippingMethod).optional(),
  carrier: zEnum(ShippingCarrier).optional(),
  cost: z.number().optional(),
  tracking: z.string().nullable().optional(),
  notes: z.string().optional(),
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(1),
  country: z.string().min(1),
});

interface ShippingFormProps {
  defaultValues?: OrderShippingInfo;
  onChange: (data: OrderShippingInfo) => void;
  className?: string;
}

export default function ShippingForm({
  defaultValues,
  onChange,
  className,
}: ShippingFormProps) {
  const { control, register, handleSubmit } = useForm<OrderShippingInfo>({
    defaultValues: {
      name: defaultValues?.name ?? "",
      email: defaultValues?.email ?? "",
      phone: defaultValues?.phone ?? "",
      method: defaultValues?.method ?? Object.values(ShippingMethod)[0],
      carrier: defaultValues?.carrier ?? Object.values(ShippingCarrier)[0],
      cost: defaultValues?.cost ?? 0,
      tracking: defaultValues?.tracking ?? null,
      line1: defaultValues?.line1 ?? "",
      line2: defaultValues?.line2 ?? "",
      city: defaultValues?.city ?? "",
      state: defaultValues?.state ?? "",
      postalCode: defaultValues?.postalCode ?? "",
      country: defaultValues?.country ?? "US",
    },
    resolver: zodResolver(
      shippingSchema
    ) as unknown as Resolver<OrderShippingInfo>,
    mode: "onChange",
  });

  const values = useWatch({ control });

  useEffect(() => {
    onChange({ ...values } as OrderShippingInfo);
  }, [values, onChange]);

  const submitForm = (data: OrderShippingInfo) => {
    console.log("Shipping info submitted:", data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className={`surface-box flex flex-col gap-4 ${className}`}
    >
      <h3 className="text-xl mb-lg text-text text-center font-bold">
        Shipping Information
      </h3>

      <div className="flex gap-4">
        <div className="flex-1">
          <Label>Address Line 1</Label>
          <Input {...register("line1")} />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Label>City</Label>
          <Input {...register("city")} />
        </div>
        <div className="flex-1">
          <Label>State</Label>
          <Input {...register("state")} />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Label>Postal Code</Label>
          <Input {...register("postalCode")} />
        </div>
        <div className="flex-1">
          <Label>Country</Label>
          <Input {...register("country")} />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Label>Email</Label>
          <Input {...register("email")} />
        </div>
        <div className="flex-1">
          <Label>Phone</Label>
          <Input {...register("phone")} />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Label>Shipping Method</Label>
          <select {...register("method")}>
            {Object.values(ShippingMethod).map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <Label>Carrier</Label>
          <select {...register("carrier")}>
            {Object.values(ShippingCarrier).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
}
