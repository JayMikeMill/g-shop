// src/components/ui/CountrySelect.tsx
import React from "react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

// Register English locale once
countries.registerLocale(enLocale);

interface CountrySelectProps {
  value: string; // current selected country code
  onChange: (code: string) => void;
  className?: string;
}

export const CountrySelect: React.FC<CountrySelectProps> = ({
  value,
  onChange,
  className,
}) => {
  // Get all country codes and names
  const countryEntries = Object.entries(countries.getNames("en"));

  // Move US to top
  countryEntries.sort((a, b) => (a[0] === "US" ? -1 : b[0] === "US" ? 1 : 0));

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full border rounded p-2 ${className ?? ""}`}
    >
      {countryEntries.map(([code, name]) => (
        <option key={code} value={code}>
          {name}
        </option>
      ))}
    </select>
  );
};
