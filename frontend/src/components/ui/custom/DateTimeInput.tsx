import * as React from "react";
import { Controller, type Control } from "react-hook-form";
import { Input } from "../primitives/Input";

interface DateTimeInputProps {
  controlProps?: { control: Control<any>; name: string; rules?: any };
  value?: Date; // standalone usage
  onChange?: (value: Date) => void; // standalone usage
  className?: string;
}

// Convert Date to datetime-local string (YYYY-MM-DDTHH:mm)
function toInputValue(date: Date | null): string {
  if (!date || !(date instanceof Date)) return "";
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 16);
}

// Convert datetime-local string back to Date object
function toDate(value: string | null): Date | null {
  if (!value) return null;
  const date = new Date(value);
  return date instanceof Date && !isNaN(date.getTime()) ? date : null;
}

export const DateTimeInput: React.FC<DateTimeInputProps> = ({
  controlProps,
  value,
  onChange,
  className = "",
}) => {
  const renderInput = (
    inputValue: Date | null,
    handleChange?: (value: Date) => void
  ) => (
    console.log({ inputValue, value }),
    (
      <Input
        type="datetime-local"
        className={"px-0 text-center" + className}
        value={toInputValue(inputValue)}
        onChange={
          handleChange && ((e) => handleChange(toDate(e.target.value)!))
        }
      />
    )
  );

  if (controlProps) {
    const { control, name, rules } = controlProps;
    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field }) =>
          renderInput(
            field.value ? new Date(field.value) : null,
            field.onChange
          )
        }
      />
    );
  }

  return renderInput(value ?? null, onChange);
};
