import { Request, Response } from "express";
import { controllerHandler } from "@utils/controllerHandler";
import { SystemSettingsService } from "@services/SystemSettingsService";

const S = new SystemSettingsService();

// ------------------------
// Get settings by scope
// ------------------------
export const getSettings = controllerHandler({
  handler: async (scope: string) => {
    const result = await S.getSettings(scope as any);
    if (!result) throw new Error("Settings not found");
    return result;
  },
});

// ------------------------
// Update settings by scope
// ------------------------
export const updateSettings = controllerHandler({
  handler: async ({ scope, settings }) => {
    const updated = await S.updateSettings(scope, settings);
    return updated;
  },
});
