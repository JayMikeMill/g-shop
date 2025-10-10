// -------------------- Admin Settings --------------------

import { Address } from "..";

export interface AdminSettings {
  // ------------------
  // Admin Contact
  // ------------------
  adminEmail: string; // main admin email
  adminPhone?: string; // optional phone
  superAdminEmails?: string[]; // extra admins for alerts

  // ------------------
  // Shipping / Fulfillment
  // ------------------
  shippingOrigin: Address; // warehouse / fulfillment address
  defaultShippingMethod?: string; // e.g., "Standard"
  defaultShippingRate?: number; // in cents
  carrierRates?: Record<string, number>; // {"UPS": 500, "FedEx": 700}
  freeShippingThreshold?: number; // in cents

  // ------------------
  // E-commerce / Payment
  // ------------------
  paymentMethods?: string[]; // ["CREDIT_CARD", "PAYPAL"]
  defaultPaymentMethod?: string;
  stripePublicKey?: string;
  stripeSecretKey?: string;
  paypalClientID?: string;
  paypalSecret?: string;
  easyPostAPIKey?: string;

  // ------------------
  // Features & Toggles
  // ------------------
  featureFlags?: Record<string, boolean>; // {"newCheckout": true, "darkMode": false}
  userRegistrationEnabled?: boolean; // toggle new signups
  orderProcessingEnabled?: boolean; // toggle new orders
  maintenanceMode?: boolean;
  maintenanceMessage?: string;
  siteOpen?: boolean; // true = live, false = closed

  // ------------------
  // Analytics / Integrations
  // ------------------
  googleAnalyticsID?: string;
  facebookPixelID?: string;
  hotjarID?: string;
  customTrackingScripts?: string[]; // array of scripts or URLs

  // ------------------
  // Notifications / Support
  // ------------------
  supportEmail?: string;
  supportPhone?: string;
  notificationEmails?: string[]; // e.g., ["orders@example.com", "support@example.com"]

  // ------------------
  // Localization & Display
  // ------------------
  defaultLanguage?: string; // "en-US"
  supportedLanguages?: string[]; // ["en-US", "es-MX"]
  timezone?: string; // "America/Mexico_City"
  dateFormat?: string; // "MM/DD/YYYY"
  timeFormat?: string; // "12h" | "24h"

  // ------------------
  // Optional Admin Customizations
  // ------------------
  customCSS?: string;
  customJS?: string;
  footerText?: string;
}
