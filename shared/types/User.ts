// User entity
export interface User {
  id: string; // primary key
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  preferences?: { language?: string; currency?: string; newsletter?: boolean }; // JSON
  addresses?: UserAddress[]; // optional related addresses
  paymentMethods?: UserPaymentMethod[]; // optional payment methods
  role: UserRole;
}

// Address entity
export interface UserAddress {
  id: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

// Payment method entity
export interface UserPaymentMethod {
  id: string;
  type: string;
  last4: string;
  expiry: string;
  providerToken: string;
}

export const Roles = {
  USER: "user",
  STAFF: "staff",
  ADMIN: "admin",
} as const;

export type UserRole = (typeof Roles)[keyof typeof Roles];
