import { AdminSettings } from "./";

export const defaultAdminSettings: AdminSettings = {
  // ------------------
  // Admin Contact
  // ------------------
  adminEmail: "admin@mystore.com",
  adminPhone: "+1-555-0000",
  superAdminEmails: ["owner@mystore.com"],

  // ------------------
  // Shipping / Fulfillment
  // ------------------
  shippingOrigin: {
    name: "My Store Warehouse",
    email: "warehouse@mystore.com",
    street1: "123 Main St",
    street2: "Apt 4B",
    city: "Anytown",
    state: "NY",
    postalCode: "10001",
    country: "USA",
  },
  defaultShippingMethod: "Standard",
  defaultShippingRate: 500, // $5 in cents
  carrierRates: {
    UPS: 700,
    FedEx: 800,
  },
  freeShippingThreshold: 5000, // $50 in cents

  // ------------------
  // E-commerce / Payment
  // ------------------
  paymentMethods: ["CREDIT_CARD", "PAYPAL"],
  defaultPaymentMethod: "CREDIT_CARD",
  stripePublicKey: "",
  stripeSecretKey: "",
  paypalClientID: "",
  paypalSecret: "",
  easyPostAPIKey: "",

  // ------------------
  // Features & Toggles
  // ------------------
  featureFlags: {
    newCheckout: false,
    darkMode: false,
  },
  userRegistrationEnabled: true,
  orderProcessingEnabled: true,
  maintenanceMode: false,
  maintenanceMessage: "",
  siteOpen: true,

  // ------------------
  // Analytics / Integrations
  // ------------------
  googleAnalyticsID: "",
  facebookPixelID: "",
  hotjarID: "",
  customTrackingScripts: [],

  // ------------------
  // Notifications / Support
  // ------------------
  supportEmail: "support@mystore.com",
  supportPhone: "+1-555-1111",
  notificationEmails: ["orders@mystore.com", "support@mystore.com"],

  // ------------------
  // Localization & Display
  // ------------------
  defaultLanguage: "en-US",
  supportedLanguages: ["en-US", "es-MX"],
  timezone: "America/New_York",
  dateFormat: "MM/DD/YYYY",
  timeFormat: "12h",

  // ------------------
  // Optional Admin Customizations
  // ------------------
  customCSS: "",
  customJS: "",
  footerText: "© 2025 My Online Store. All rights reserved.",
};
