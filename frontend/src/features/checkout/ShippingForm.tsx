import { useEffect } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input, Label, CountrySelect } from "@components/ui";
import {
  ShippingCarrier,
  ShippingMethod,
  type ShippingInfo,
} from "@shared/types";

// ----- Safe form types -----
export type ShippingFormSafe = {
  id?: string;
  address: {
    name: string;
    email: string;
    phone?: string;
    street1: string;
    street2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  method: ShippingMethod;
  carrier: ShippingCarrier;
  cost?: number;
  tracking?: string;
};

// ----- Zod schema -----
const shippingSchema = z.object({
  address: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    street1: z.string().min(1),
    street2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(1),
  }),
  method: z.nativeEnum(ShippingMethod),
  carrier: z.nativeEnum(ShippingCarrier),
  cost: z.number().optional(),
  tracking: z.string().optional(),
});

// ----- Props -----
interface ShippingFormProps {
  defaultValues?: ShippingInfo;
  onChange: (data: ShippingFormSafe) => void;
  className?: string;
}

// ----- Component -----
export default function ShippingForm({
  defaultValues,
  onChange,
  className,
}: ShippingFormProps) {
  const { control, register, handleSubmit } = useForm<ShippingFormSafe>({
    defaultValues: {
      ...defaultValues,
      address: {
        name: defaultValues?.address?.name ?? "",
        email: defaultValues?.address?.email ?? "",
        phone: defaultValues?.address?.phone ?? undefined,
        street1: defaultValues?.address?.street1 ?? "",
        street2: defaultValues?.address?.street2 ?? undefined,
        city: defaultValues?.address?.city ?? "",
        state: defaultValues?.address?.state ?? "",
        postalCode: defaultValues?.address?.postalCode ?? "",
        country: defaultValues?.address?.country ?? "US",
      },
      method: defaultValues?.method ?? ShippingMethod.STANDARD,
      carrier: defaultValues?.carrier ?? ShippingCarrier.UPS,
      cost: defaultValues?.cost ?? undefined,
      tracking: defaultValues?.tracking ?? undefined,
    },
    resolver: zodResolver(shippingSchema),
    mode: "onChange",
  });

  const values = useWatch({ control });

  useEffect(() => {
    if (values.address) {
      onChange({
        ...values,
        method: values.method ?? ShippingMethod.STANDARD,
        carrier: values.carrier ?? ShippingCarrier.UPS,
        address: {
          name: values.address.name ?? "",
          email: values.address.email ?? "",
          phone: values.address.phone,
          street1: values.address.street1 ?? "",
          street2: values.address.street2,
          city: values.address.city ?? "",
          state: values.address.state ?? "",
          postalCode: values.address.postalCode ?? "",
          country: values.address.country ?? "",
        },
      });
    }
  }, [values, onChange]);

  const submitForm = (data: ShippingFormSafe) => {
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
          <Label>Name</Label>
          <Input {...register("address.name")} />
        </div>
        <div className="flex-1">
          <Label>Email</Label>
          <Input {...register("address.email")} />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Label>Phone</Label>
          <Input {...register("address.phone")} />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Label>Street 1</Label>
          <Input {...register("address.street1")} />
        </div>
        <div className="flex-1">
          <Label>Street 2</Label>
          <Input {...register("address.street2")} />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Label>City</Label>
          <Input {...register("address.city")} />
        </div>
        <div className="flex-1">
          <Label>State</Label>
          <Input {...register("address.state")} />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Label>Postal Code</Label>
          <Input {...register("address.postalCode")} />
        </div>

        <div className="flex-1">
          <Label>Country</Label>
          <Controller
            name="address.country"
            control={control}
            render={({ field }) => (
              <CountrySelect
                value={field.value || "US"} // default to US
                onChange={field.onChange} // RHF change
              />
            )}
          />
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
