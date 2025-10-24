import type { SiteSettings } from "./";

export const defaultSiteSettings: SiteSettings = {
  // ------------------
  // Basic Info
  // ------------------
  siteName: "My Online Store",
  siteTagline: "Quality products, fast delivery",
  siteDescription: "The best place to buy amazing products.",
  logoURL: "/assets/logo.png",
  bannerURL: "/assets/banner.jpg",
  bannerMessage: "Free shipping on orders over $50!",
  homePageCollections: [],
  aboutPageContent: "Welcome to My Online Store.",

  // ------------------
  // Theme & Appearance
  // ------------------
  backgroundColor: "#ffffff",
  backgroundAltColor: "#ffffff",
  foregroundColor: "#000000",
  foregroundAltColor: "#333333",
  surfaceColor: "#ffffff",
  surfaceAltColor: "#f5f5f5",
  primaryColor: "#0070f3",
  secondaryColor: "#1c1c1c",
  accentColor: "#ff4081",
  borderColor: "#e0e0e0",

  headingFont: "Arial, sans-serif",
  bodyFont: "Verdana, sans-serif",
  fontFamily: "Arial, sans-serif",
  fontSize: 16,
  borderRadius: 4,
  shadowDepth: 4,

  // ------------------
  // Social Media
  // ------------------
  facebookHandle: "myStoreFB",
  twitterHandle: "myStoreTW",
  instagramHandle: "myStoreIG",
  linkedinHandle: "myStoreLI",
  youtubeHandle: "myStoreYT",
  tiktokHandle: "myStoreTT",
  pinterestHandle: "myStorePT",
  otherSocialHandles: {},

  // ------------------
  // E-commerce
  // ------------------
  defaultCurrency: "USD",
  itemsPerPage: 12,
  taxRate: 7.5,
  enableReviews: true,
  enableWishlist: true,
  enableCoupons: true,
  enableGiftCards: false,
  enableSubscriptions: false,
  maxCartItems: 50,
  freeShippingThreshold: 5000, // $50 in cents
  flatShippingRate: 500, // $5 in cents
  carrierShippingRates: {
    UPS: 700, // $7
    FedEx: 800, // $8
  },
  paymentMethods: ["CREDIT_CARD", "PAYPAL"],
  defaultShippingMethod: "Standard",
  defaultPaymentMethod: "CREDIT_CARD",

  // ------------------
  // SEO & Metadata
  // ------------------
  metaTitle: "My Online Store",
  metaDescription: "Shop the best products online with fast shipping.",
  metaKeywords: ["online store", "shopping", "ecommerce", "products"],
  faviconURL: "/assets/favicon.ico",
  openGraphImageURL: "/assets/og-image.jpg",
  twitterCardImageURL: "/assets/twitter-card.jpg",

  // ------------------
  // Contact Info
  // ------------------
  contactEmail: "info@mystore.com",
  contactPhone: "+1-555-1234",
  contactAddress: "123 Main St, Anytown, USA",
  supportEmail: "support@mystore.com",
  supportPhone: "+1-555-5678",
  liveChatEnabled: true,

  // ------------------
  // Administrative / Misc
  // ------------------
  maintenanceMode: false,
  maintenanceMessage: "",
  defaultLanguage: "en-US",
  supportedLanguages: ["en-US", "es-MX"],
  timezone: "America/New_York",
  dateFormat: "MM/DD/YYYY",
  timeFormat: "12h",
  termsOfServiceURL: "/terms",
  privacyPolicyURL: "/privacy",
  cookiePolicyURL: "/cookies",
  footerText: "© 2025 My Online Store. All rights reserved.",
  customCSS: "",
  customJS: "",

  // ------------------
  // Feature Flags
  // ------------------
  featureFlags: {
    newCheckout: false,
    darkMode: false,
  },
};
