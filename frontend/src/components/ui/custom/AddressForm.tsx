import {
  useForm,
  Controller,
  type UseFormReturn,
  type Path,
} from "react-hook-form";
import { Input, Label, CountrySelect } from "@components/ui";
import { emptyAddress, type Address, type SafeType } from "@shared/types";

interface AddressFormProps {
  className?: string;
  formContext: UseFormReturn<any>; // optional parent form
  rootName?: string; // optional root path for nested forms
}

export default function AddressForm({
  className,
  formContext,
  rootName,
}: AddressFormProps) {
  // Use parent form if provided, else create local form
  const form =
    formContext ??
    useForm<SafeType<Address>>({
      defaultValues: emptyAddress as SafeType<Address>,
    });

  const { control, watch } = form;

  // Strongly typed nested field path
  const getFieldName = <K extends keyof Address>(
    field: K
  ): Path<SafeType<Address>> =>
    rootName
      ? (`${rootName}.${field}` as Path<SafeType<Address>>)
      : (field as Path<SafeType<Address>>);

  // Watch a single field safely
  const watchField = <K extends keyof Address>(field: K): Address[K] =>
    watch(getFieldName(field) as any); // safe cast for watch

  // Split full name safely into first/last
  const fullName = (watchField("name") ?? "") as string;
  const [firstName, lastName] = fullName.split(" ", 2);

  const handleNameChange = (part: "first" | "last", value: string) => {
    const parts = fullName.split(" ");
    const newFirst = part === "first" ? value : (parts[0] ?? "");
    const newLast = part === "last" ? value : (parts[1] ?? "");
    const full = [newFirst, newLast].filter(Boolean).join(" ");
    (form.setValue as UseFormReturn<SafeType<Address>>["setValue"])(
      getFieldName("name"),
      full,
      { shouldValidate: true, shouldDirty: true }
    );
  };

  // Cast register to the form type we know
  const safeRegister = form.register as UseFormReturn<
    SafeType<Address>
  >["register"];

  return (
    <div className={`flex flex-col gap-4 ${className ?? ""} pad-sm`}>
      {/* First / Last Name */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <Label>First Name</Label>
          <Input
            value={firstName}
            onChange={(e) => handleNameChange("first", e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Label>Last Name</Label>
          <Input
            value={lastName}
            onChange={(e) => handleNameChange("last", e.target.value)}
          />
        </div>
      </div>

      {/* Email / Phone */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <Label>Email</Label>
          <Input {...safeRegister(getFieldName("email"))} />
        </div>
        <div className="flex-1">
          <Label>Phone</Label>
          <Input {...safeRegister(getFieldName("phone"))} />
        </div>
      </div>

      {/* Street */}
      <div className="flex-1">
        <Label>Street Name</Label>
        <Input {...safeRegister(getFieldName("street1"))} />
      </div>

      {/* City / State / Postal */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Label>City</Label>
          <Input {...safeRegister(getFieldName("city"))} />
        </div>
        <div className="flex-1">
          <Label>State</Label>
          <Input {...safeRegister(getFieldName("state"))} />
        </div>
      </div>
      <div className="flex-1">
        <Label>Postal Code</Label>
        <Input {...safeRegister(getFieldName("postalCode"))} />
      </div>
      {/* Country */}
      <div className="flex-1">
        <Label>Country</Label>
        <Controller
          name={getFieldName("country")}
          control={control}
          render={({ field }) => <CountrySelect {...field} />}
        />
      </div>
    </div>
  );
}
