import { SiteSettings, UserSettings, AdminSettings } from "@shared/types";

// -----------Default site settings -----------
export const defaultSiteSettings: SiteSettings = {
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

// -----------Default user settings -----------
export const defaultUserSettings: UserSettings = {};

// -----------Default admin settings -----------
export const defaultAdminSettings: AdminSettings = {};
