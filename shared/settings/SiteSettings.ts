// -------------------- Public Site Settings --------------------

export interface SiteSettings {
  // ------------------
  // Basic Info
  // ------------------
  siteName: string;
  siteDescription?: string;
  siteTagline?: string;
  bannerURL?: string;
  bannerMessage?: string;
  logoURL?: string;

  // ------------------
  // Theme & Appearance
  // ------------------
  backgroundColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  textColor?: string;
  headingFont?: string;
  bodyFont?: string;
  fontFamily?: string;
  fontSize?: number;
  borderRadius?: number;
  shadowDepth?: number;

  // ------------------
  // Social Media
  // ------------------
  facebookHandle?: string;
  twitterHandle?: string;
  instagramHandle?: string;
  linkedinHandle?: string;
  youtubeHandle?: string;
  tiktokHandle?: string;
  pinterestHandle?: string;
  otherSocialHandles?: Record<string, string>;

  // ------------------
  // E-commerce (public info only)
  // ------------------
  defaultCurrency?: string;
  itemsPerPage?: number;
  taxRate?: number; // percentage, e.g., 7.5
  enableReviews?: boolean;
  enableWishlist?: boolean;
  enableCoupons?: boolean;
  enableGiftCards?: boolean;
  enableSubscriptions?: boolean;
  maxCartItems?: number;
  freeShippingThreshold?: number; // in cents
  flatShippingRate?: number; // in cents
  carrierShippingRates?: Record<string, number>; // e.g., {"UPS": 500, "FedEx": 700}
  paymentMethods?: string[]; // e.g., ["CREDIT_CARD", "PAYPAL"]
  defaultShippingMethod?: string;
  defaultPaymentMethod?: string;

  // ------------------
  // SEO & Metadata
  // ------------------
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  faviconURL?: string;
  openGraphImageURL?: string;
  twitterCardImageURL?: string;

  // ------------------
  // Contact Info (public only)
  // ------------------
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
  supportEmail?: string;
  supportPhone?: string;
  liveChatEnabled?: boolean;

  // ------------------
  // Administrative / Misc (public only)
  // ------------------
  maintenanceMode?: boolean;
  maintenanceMessage?: string;
  defaultLanguage?: string; // e.g., "en-US"
  supportedLanguages?: string[]; // e.g., ["en-US", "es-MX"]
  timezone?: string; // e.g., "America/Mexico_City"
  dateFormat?: string; // e.g., "MM/DD/YYYY"
  timeFormat?: string; // "12h" | "24h"
  termsOfServiceURL?: string;
  privacyPolicyURL?: string;
  cookiePolicyURL?: string;
  footerText?: string;
  customCSS?: string;
  customJS?: string;

  // ------------------
  // Feature Flags (safe for public)
  // ------------------
  featureFlags?: Record<string, boolean>; // e.g., {"newCheckout": true}
}

// -------------------- Admin Settings (private) --------------------
