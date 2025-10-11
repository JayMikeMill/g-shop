import { EngineSettings } from "./";

export const defaultEngineSettings: EngineSettings = {
  // ------------------
  // System / Runtime
  // ------------------
  environment: "development",
  enableDebugLogs: true,
  logRetentionDays: 30,
  maxConcurrentJobs: 10,
  cacheTTL: 3600, // 1 hour
  queueProcessingEnabled: true,

  // ------------------
  // Feature Flags / Experiments
  // ------------------
  featureFlags: {
    newCheckout: false,
    darkMode: false,
  },

  // ------------------
  // Performance / Limits
  // ------------------
  maxUploadSize: 10_000_000, // 10 MB
  requestTimeout: 30_000, // 30 seconds
  rateLimitPerIP: 100, // requests per minute
  sessionTimeout: 3600, // 1 hour

  // ------------------
  // Maintenance / Operations
  // ------------------
  maintenanceMode: false,
  maintenanceMessage: "",
  autoCleanupEnabled: true,
  backupEnabled: true,
  backupFrequencyHours: 24,

  // ------------------
  // API Keys & Service Credentials (PRIVATE)
  // ------------------
  stripeSecretKey: "",
  stripePublicKey: "",
  paypalClientID: "",
  paypalSecret: "",
  easyPostAPIKey: "",
  mailchimpAPIKey: "",
  sendGridAPIKey: "",
  internalAPIKey: "",
  externalServiceKeys: {},

  // ------------------
  // Localization & Display Defaults
  // ------------------
  defaultLanguage: "en-US",
  timezone: "America/New_York",
  dateFormat: "MM/DD/YYYY",
  timeFormat: "12h",

  // ------------------
  // Custom Scripts / Overrides
  // ------------------
  customCSS: "",
  customJS: "",
};
