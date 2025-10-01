import { useEffect } from "react";
import {
  ShippingCarriers,
  ShippingMethods,
  type ShippingInfo,
} from "@shared/types/Shipping";
import { z } from "zod";
import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@components/ui";

const zEnum = <T extends Record<string, string>>(obj: T) =>
  z.enum(Object.values(obj) as [string, ...string[]]);

const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});

const shippingSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  method: zEnum(ShippingMethods),
  carrier: zEnum(ShippingCarriers),
  trackingNumber: z.string().nullable().optional(),
  cost: z.number().optional(),
  notes: z.string().optional(),
  address: addressSchema,
});

interface ShippingFormProps {
  defaultValues?: ShippingInfo;
  onChange: (data: ShippingInfo) => void;
  className?: string;
}

export default function ShippingForm({
  defaultValues,
  onChange,
  className,
}: ShippingFormProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingInfo>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      method: Object.values(ShippingMethods)[0],
      carrier: Object.values(ShippingCarriers)[0],
      trackingNumber: null,
      cost: 0,
      notes: "",
      ...defaultValues,
      address: {
        firstName: "",
        lastName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "US",
        ...(defaultValues?.address ?? {}),
      },
    },
    resolver: zodResolver(shippingSchema) as unknown as Resolver<ShippingInfo>,
    mode: "onChange",
  });

  const values = useWatch({ control });

  useEffect(() => {
    const fullValues: ShippingInfo = {
      name: values.name ?? "",
      email: values.email ?? "",
      phone: values.phone ?? "",
      method: values.method ?? Object.values(ShippingMethods)[0],
      carrier: values.carrier ?? Object.values(ShippingCarriers)[0],
      trackingNumber: values.trackingNumber ?? null,
      cost: values.cost ?? 0,
      notes: values.notes ?? "",
      address: {
        firstName: values.address?.firstName ?? "",
        lastName: values.address?.lastName ?? "",
        addressLine1: values.address?.addressLine1 ?? "",
        addressLine2: values.address?.addressLine2 ?? "",
        city: values.address?.city ?? "",
        state: values.address?.state ?? "",
        postalCode: values.address?.postalCode ?? "",
        country: values.address?.country ?? "US",
      },
    };
    onChange(fullValues);
  }, [values, onChange]);

  const submitForm = (data: ShippingInfo) => {
    console.log("Shipping info submitted:", data);
  };

  const inputClassName = "input-box w-full px-2 h-8";
  const labelClassName = "px-1";

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className={`surface-box flex flex-col gap-4 ${className}`}
    >
      <h3 className="text-xl mb-lg text-text text-center font-bold">
        {"Shipping Information"}
      </h3>
      {/* Name Row */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className={labelClassName}>First Name</label>
          <Input
            className={inputClassName}
            {...register("address.firstName")}
          />
        </div>
        <div className="flex-1">
          <label className={labelClassName}>Last Name</label>
          <Input className={inputClassName} {...register("address.lastName")} />
        </div>
      </div>

      {/* Address Line 1 - full width */}
      <div>
        <label className={labelClassName}>Address Line 1</label>
        <Input
          className={inputClassName}
          {...register("address.addressLine1")}
        />
      </div>

      {/* Address Line 2 - full width */}
      <div>
        <label className={labelClassName}>Address Line 2</label>
        <Input
          className={inputClassName}
          {...register("address.addressLine2")}
        />
      </div>

      {/* City + State Row */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className={labelClassName}>City</label>
          <Input className={inputClassName} {...register("address.city")} />
        </div>
        <div className="flex-1">
          <label className={labelClassName}>State</label>
          <Input className={inputClassName} {...register("address.state")} />
        </div>
      </div>

      {/* Postal Code + Country Row */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className={labelClassName}>Postal Code</label>
          <Input
            className={inputClassName}
            {...register("address.postalCode")}
          />
        </div>
        <div className="flex-1">
          <label className={labelClassName}>Country</label>
          <Input className={inputClassName} {...register("address.country")} />
        </div>
      </div>

      {/* Email + Phone Row */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className={labelClassName}>Email</label>
          <Input className={inputClassName} {...register("email")} />
        </div>
        <div className="flex-1">
          <label className={labelClassName}>Phone</label>
          <Input className={inputClassName} {...register("phone")} />
        </div>
      </div>

      {/* Shipping Method + Carrier Row */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className={labelClassName}>Shipping Method</label>
          <select className={inputClassName} {...register("method")}>
            {Object.values(ShippingMethods).map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className={labelClassName}>Carrier</label>
          <select className={inputClassName} {...register("carrier")}>
            {Object.values(ShippingCarriers).map((c) => (
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
