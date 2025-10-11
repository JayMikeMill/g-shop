import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Input, Label, CountrySelect } from "@components/ui";
import type { Address } from "@shared/types";

interface AddressFormProps {
  address?: Address;
  setAddress: (address: Address) => void;
  className?: string;
}

export default function AddressForm({
  address,
  setAddress,
  className,
}: AddressFormProps) {
  const { control, register, getValues } = useForm<Address>({
    defaultValues: {
      name: address?.name ?? "",
      email: address?.email ?? "",
      phone: address?.phone ?? "",
      street1: address?.street1 ?? "",
      street2: address?.street2 ?? "",
      city: address?.city ?? "",
      state: address?.state ?? "",
      postalCode: address?.postalCode ?? "",
      country: address?.country ?? "US",
    },
  });

  // Call setAddress whenever the form values change
  useEffect(() => {
    const handle = () => {
      setAddress(getValues());
    };

    // Use a timeout to catch changes after render
    const id = setTimeout(handle);
    return () => clearTimeout(id);
  }, [control, getValues, setAddress]);

  return (
    <form className={`flex flex-col gap-4 ${className} pad-sm`}>
      <div className="flex gap-4">
        <div className="flex-1">
          <Label>Name</Label>
          <Input {...register("name")} />
        </div>
        <div className="flex-1">
          <Label>Email</Label>
          <Input {...register("email")} />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Label>Phone</Label>
          <Input {...register("phone")} />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Label>Street 1</Label>
          <Input {...register("street1")} />
        </div>
        <div className="flex-1">
          <Label>Street 2</Label>
          <Input {...register("street2")} />
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
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <CountrySelect
                value={field.value ?? "US"}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
    </form>
  );
}
