import { Request, Response } from "express";
import { controllerHandler } from "@utils/controllerHandler";
import { SystemSettingsService } from "@services/SystemSettingsService";

const S = new SystemSettingsService();

// ------------------------
// Get settings by scope
// ------------------------
export const getSettings = controllerHandler({
  select: (req: Request) => req.params.scope, // pick the scope from params
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
  select: (req: Request) => ({
    scope: req.params.scope,
    settings: req.body,
  }),
  handler: async ({ scope, settings }: { scope: string; settings: any }) => {
    const updated = await S.updateSystemSettings(scope as any, settings);
    return updated;
  },
});
