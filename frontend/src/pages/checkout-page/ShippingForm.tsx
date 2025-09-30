import { useEffect } from "react";
import {
  ShippingCarriers,
  ShippingMethods,
  type ShippingInfo,
} from "@shared/types/Shipping";
import { z } from "zod";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Utility to create Zod enums from const objects
const zEnum = <T extends Record<string, string>>(obj: T) =>
  z.enum(Object.values(obj) as [string, ...string[]]);

// Address schema
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

// Shipping info schema (for validation only)
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
}

export default function ShippingForm({
  defaultValues,
  onChange,
}: ShippingFormProps) {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<ShippingInfo>({
    defaultValues,
    resolver: zodResolver(shippingSchema) as unknown as Resolver<ShippingInfo>,
    mode: "onChange",
  });

  const values = watch();
  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  const submitForm = (data: ShippingInfo) => {
    console.log("Shipping info submitted:", data);
  };

  // Common input styles
  const inputClasses = "input-box";
  const selectClasses = inputClasses;
  const textareaClasses =
    "w-full border border-border rounded-md p-2 text-text bg-input focus:outline-none focus:ring-2 focus:ring-primary h-24";

  return (
    <form onSubmit={handleSubmit(submitForm)} className="space-y-md">
      {/* Name */}
      <div>
        <label className="block mb-1 font-semibold">Name</label>
        <input className={inputClasses} {...register("name")} />
        <p className="text-red-500">{errors.name?.message}</p>
      </div>

      {/* Email */}
      <div>
        <label className="block mb-1 font-semibold">Email</label>
        <input className={inputClasses} {...register("email")} />
        <p className="text-red-500">{errors.email?.message}</p>
      </div>

      {/* Phone */}
      <div>
        <label className="block mb-1 font-semibold">Phone</label>
        <input className={inputClasses} {...register("phone")} />
        <p className="text-red-500">{errors.phone?.message}</p>
      </div>

      {/* Address Fields */}
      <div>
        <label className="block mb-1 font-semibold">First Name</label>
        <input className={inputClasses} {...register("address.firstName")} />
        <p className="text-red-500">{errors.address?.firstName?.message}</p>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Last Name</label>
        <input className={inputClasses} {...register("address.lastName")} />
        <p className="text-red-500">{errors.address?.lastName?.message}</p>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Address Line 1</label>
        <input className={inputClasses} {...register("address.addressLine1")} />
        <p className="text-red-500">{errors.address?.addressLine1?.message}</p>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Address Line 2</label>
        <input className={inputClasses} {...register("address.addressLine2")} />
      </div>

      <div>
        <label className="block mb-1 font-semibold">City</label>
        <input className={inputClasses} {...register("address.city")} />
        <p className="text-red-500">{errors.address?.city?.message}</p>
      </div>

      <div>
        <label className="block mb-1 font-semibold">State</label>
        <input className={inputClasses} {...register("address.state")} />
        <p className="text-red-500">{errors.address?.state?.message}</p>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Postal Code</label>
        <input className={inputClasses} {...register("address.postalCode")} />
        <p className="text-red-500">{errors.address?.postalCode?.message}</p>
      </div>

      <div>
        <label className="block mb-1 font-semibold">Country</label>
        <input className={inputClasses} {...register("address.country")} />
        <p className="text-red-500">{errors.address?.country?.message}</p>
      </div>

      {/* Shipping method */}
      <div>
        <label className="block mb-1 font-semibold">Shipping Method</label>
        <select className={selectClasses} {...register("method")}>
          {Object.values(ShippingMethods).map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <p className="text-red-500">{errors.method?.message}</p>
      </div>

      {/* Carrier */}
      <div>
        <label className="block mb-1 font-semibold">Carrier</label>
        <select className={selectClasses} {...register("carrier")}>
          {Object.values(ShippingCarriers).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <p className="text-red-500">{errors.carrier?.message}</p>
      </div>

      {/* Notes */}
      <div>
        <label className="block mb-1 font-semibold">Notes</label>
        <textarea className={textareaClasses} {...register("notes")} />
      </div>
    </form>
  );
}
