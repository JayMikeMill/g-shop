// src/components/ui/CountrySelect.tsx
import React from "react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { AnimatedSelect } from "./AnimatedSelect";

// Register English locale once
countries.registerLocale(enLocale);

interface CountrySelectProps {
  value: string; // current selected country code
  onChange: (code: string) => void;
  className?: string;
  menuClassName?: string;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  className,
  menuClassName,
}) => {
  // Get all country codes and names
  const countryEntries = Object.entries(countries.getNames("en"));

  // Move US to top
  countryEntries.sort((a, b) => (a[0] === "US" ? -1 : b[0] === "US" ? 1 : 0));

  // Convert to items for AnimatedSelect
  const items = countryEntries.map(([code, name]) => ({
    value: code,
    label: name,
  }));

  return (
    <AnimatedSelect
      items={items}
      value={value}
      onChange={onChange}
      className={className}
      menuClassName={menuClassName}
      placeholder="Select Country"
      noItemsText="No countries"
    />
  );
};
