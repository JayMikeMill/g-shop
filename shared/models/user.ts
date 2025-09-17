import { type Address } from "./shipping-info";

export interface User {
  id: string;
  name: string;
  email: string;
  address?: Address;
  role?: Role;
}

export const Roles = {
  USER: "user",
  STAFF: "staff",
  ADMIN: "admin",
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
