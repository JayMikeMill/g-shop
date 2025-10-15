import { Address } from "../types";

export function formatAddress(address?: Address | null): string {
  if (!address) return "";

  const lines: string[] = [];

  // Name / Company
  if (address.name) lines.push(address.name);
  if (address.company) lines.push(address.company);

  // Street
  if (address.street1) lines.push(address.street1);
  if (address.street2) lines.push(address.street2);

  // City, State, PostalCode
  const cityStateZip = [
    address.city,
    address.state,
    address.postalCode,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
  if (cityStateZip) lines.push(cityStateZip);

  return lines.join("\n");
}
