import { Controller, useForm } from "react-hook-form";
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
  const { control, register } = useForm<Address>({
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

  // Extract first and last name from full name if possible
  const [firstName = "", lastName = ""] = (address?.name ?? "").split(" ", 2);

  function handleChange<K extends keyof Address>(key: K, value: Address[K]) {
    setAddress({ ...address, [key]: value } as Address);
  }

  function handleNameChange(part: "first" | "last", value: string) {
    const currentFull = address?.name ?? "";
    const parts = currentFull.split(" ");
    const newFirst = part === "first" ? value : (parts[0] ?? "");
    const newLast = part === "last" ? value : (parts[1] ?? "");
    const fullName = [newFirst, newLast].filter(Boolean).join(" ");
    handleChange("name", fullName);
  }

  return (
    <form className={`flex flex-col gap-4 ${className ?? ""} pad-sm`}>
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <Label>First Name</Label>
          <Input
            defaultValue={firstName}
            onChange={(e) => handleNameChange("first", e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Label>Last Name</Label>
          <Input
            defaultValue={lastName}
            onChange={(e) => handleNameChange("last", e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <Label>Email</Label>
          <Input
            {...register("email")}
            defaultValue={address?.email ?? ""}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Label>Phone</Label>
          <Input
            {...register("phone")}
            defaultValue={address?.phone ?? ""}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1">
        <Label>Street Name</Label>
        <Input
          {...register("street1")}
          defaultValue={address?.street1 ?? ""}
          onChange={(e) => handleChange("street1", e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Label>City</Label>
          <Input
            {...register("city")}
            defaultValue={address?.city ?? ""}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Label>State</Label>
          <Input
            {...register("state")}
            defaultValue={address?.state ?? ""}
            onChange={(e) => handleChange("state", e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Label>Postal Code</Label>
          <Input
            {...register("postalCode")}
            defaultValue={address?.postalCode ?? ""}
            onChange={(e) => handleChange("postalCode", e.target.value)}
          />
        </div>
      </div>

      <div className="flex-1">
        <Label>Country</Label>
        <Controller
          name="country"
          control={control}
          render={({ field }) => (
            <CountrySelect
              value={address?.country ?? "US"}
              onChange={(val) => {
                field.onChange(val);
                handleChange("country", val);
              }}
            />
          )}
        />
      </div>
    </form>
  );
}
