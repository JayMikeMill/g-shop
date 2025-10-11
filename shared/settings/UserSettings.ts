// -------------------- User Settings --------------------

export interface UserSettings {
  // ------------------
  // Personalization
  // ------------------
  language?: string; // e.g., "en-US"
  timezone?: string; // e.g., "America/New_York"
  dateFormat?: string; // e.g., "MM/DD/YYYY"
  timeFormat?: string; // "12h" | "24h"
  theme?: "light" | "dark" | "system";
  fontSize?: string; // e.g., "16px"

  // ------------------
  // Account Preferences
  // ------------------
  receiveMarketingEmails?: boolean;
  receiveOrderNotifications?: boolean;
  defaultShippingAddressId?: string; // reference to an address
  defaultPaymentMethod?: string; // e.g., "CREDIT_CARD"

  // ------------------
  // E-commerce / Site Preferences
  // ------------------
  itemsPerPage?: number; // override default from site
  enableDarkMode?: boolean;
  enableAccessibilityMode?: boolean;

  // ------------------
  // Feature Flags / Experiments
  // ------------------
  featureFlags?: Record<string, boolean>; // e.g., {"betaCheckout": true}
}
