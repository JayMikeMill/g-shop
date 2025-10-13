import { z } from "zod";

export const AdminSettingsSchema = z.object({
  adminEmail: z.string().email().optional(),
  adminPhone: z.string().optional(),
  superAdminEmails: z.array(z.string()).optional(),
  shippingOrigin: z.any().optional(), // Accept all for now
  userRegistrationEnabled: z.boolean().optional(),
  orderProcessingEnabled: z.boolean().optional(),
  maintenanceMode: z.boolean().optional(),
  siteOpen: z.boolean().optional(),
  googleAnalyticsID: z.string().optional(),
  facebookPixelID: z.string().optional(),
  hotjarID: z.string().optional(),
  customTrackingScripts: z.array(z.any()).optional(),
});

export type AdminSettingsFormType = z.infer<typeof AdminSettingsSchema>;
