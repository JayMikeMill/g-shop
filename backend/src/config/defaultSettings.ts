import { SiteSettings, UserSettings, AdminSettings } from "@shared/types";
import SystemSettingsService from "@services/SystemSettingsService";

// -----------Default site settings -----------
const defaultSiteSettings: SiteSettings = {
  siteName: "My Store",
  themeSettings: {
    backgroundColor: "#ffffff",
    primaryColor: "#0070f3",
    secondaryColor: "#1c1c1e",
    accentColor: "#ff4081",
    textColor: "#333333",
    headingFont: "Arial, sans-serif",
    bodyFont: "Georgia, serif",
    fontFamily: "Arial, sans-serif",
    fontSize: "16px",
  },
  bannerURL: "https://example.com/banner.jpg",
  bannerMessage: "Welcome to My Store!",
  socialMediaHandles: {
    facebook: "https://facebook.com/mystore",
    twitter: "https://twitter.com/mystore",
    instagram: "https://instagram.com/mystore",
    linkedin: "https://linkedin.com/company/mystore",
    youtube: "https://youtube.com/c/mystore",
  },
  defaultCurrency: "USD",
  itemsPerPage: 12,
  enableReviews: true,
  shippingRates: {
    flatRate: 500,
    freeShippingThreshold: 10000,
    carrierRates: {
      UPS: 500,
      FedEx: 700,
    },
  },
  paymentMethods: ["CREDIT_CARD", "PAYPAL"],
  taxRate: 7.5,
};

// -----------Default admin settings -----------
const defaultAdminSettings: AdminSettings = {
  adminEmail: "admin@mystore.com",
  shippingOrigin: {
    name: "My Store Warehouse",
    email: "warehouse@mystore.com",
    street1: "123 Main St",
    city: "Anytown",
    state: "CA",
    postalCode: "12345",
    country: "USA",
    phone: "555-123-4567",
  },
};

// -----------Default user settings -----------
const defaultEngineSettings: UserSettings = {
  maxConcurrentRequests: 5,
  requestTimeout: 30000, // in ms
  enableLogging: true,
  logLevel: "info",
};

// set default settings for a scope if not exist
export async function setDefaultSystemSettings() {
  await SystemSettingsService.setDefaults("SITE", defaultSiteSettings);
  await SystemSettingsService.setDefaults("ADMIN", defaultAdminSettings);
  await SystemSettingsService.setDefaults("ENGINE", defaultEngineSettings);
}
