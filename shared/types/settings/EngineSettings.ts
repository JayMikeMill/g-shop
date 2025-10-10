// -------------------- Engine / System Settings --------------------

export interface EngineSettings {
  // ------------------
  // System / Runtime
  // ------------------
  environment?: "development" | "staging" | "production";
  enableDebugLogs?: boolean;
  logRetentionDays?: number; // how long logs are stored
  maxConcurrentJobs?: number;
  cacheTTL?: number; // in seconds for global cache
  queueProcessingEnabled?: boolean;

  // ------------------
  // Feature Flags / Experiments
  // ------------------
  featureFlags?: Record<string, boolean>; // e.g., {"newCheckout": true}

  // ------------------
  // Performance / Limits
  // ------------------
  maxUploadSize?: number; // in bytes
  requestTimeout?: number; // in milliseconds
  rateLimitPerIP?: number; // requests per minute
  sessionTimeout?: number; // in seconds

  // ------------------
  // Maintenance / Operations
  // ------------------
  maintenanceMode?: boolean;
  maintenanceMessage?: string;
  autoCleanupEnabled?: boolean; // delete old data automatically
  backupEnabled?: boolean; // auto backups
  backupFrequencyHours?: number;

  // ------------------
  // API Keys & Service Credentials (PRIVATE)
  // ------------------
  stripeSecretKey?: string;
  stripePublicKey?: string;
  paypalClientID?: string;
  paypalSecret?: string;
  easyPostAPIKey?: string;
  mailchimpAPIKey?: string;
  sendGridAPIKey?: string;
  internalAPIKey?: string; // for internal service-to-service calls
  externalServiceKeys?: Record<string, string>; // e.g., {"serviceA": "key123"}

  // ------------------
  // Localization & Display Defaults
  // ------------------
  defaultLanguage?: string; // "en-US"
  timezone?: string; // "America/Mexico_City"
  dateFormat?: string; // "MM/DD/YYYY"
  timeFormat?: string; // "12h" | "24h"

  // ------------------
  // Custom Scripts / Overrides
  // ------------------
  customCSS?: string;
  customJS?: string;
}
