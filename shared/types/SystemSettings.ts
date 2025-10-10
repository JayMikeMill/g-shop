// -------------------- Settings --------------------

import { Address } from "./";

// General Site Settings
export interface SiteSettings {
  siteName: string;
  themeSettings: ThemeSettings;
  bannerURL?: string;
  bannerMessage?: string;
  socialMediaHandles?: SocialMediaHandles;

  defaultCurrency: string;
  itemsPerPage: number;
  enableReviews: boolean;
  shippingRates: ShippingRates;
  paymentMethods: string[]; // e.g., ["CREDIT_CARD", "PAYPAL"]
  taxRate: number; // as a percentage, e.g., 7.5 for 7.5%
}

export interface ShippingRates {
  flatRate: number; // in cents
  freeShippingThreshold?: number; // in cents
  carrierRates?: Record<string, number>; // e.g., {"UPS": 500, "FedEx": 700}
}

export interface ThemeSettings {
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  headingFont: string;
  bodyFont: string;
  fontFamily: string;
  fontSize: string;
}

export interface SocialMediaHandles {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
}

export interface AdminSettings {
  adminEmail: string;
  shippingOrigin: Address;
}

export interface UserSettings {}

export interface EngineSettings {}

export type AnySystemSettings = SiteSettings | AdminSettings | EngineSettings;
