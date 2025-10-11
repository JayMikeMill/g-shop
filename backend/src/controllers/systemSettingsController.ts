import { Request } from "express";
import { controllerHandler } from "@utils";
import { SystemSettingsService as S } from "@services";

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
    const updated = await S.updateSettings(scope as any, settings);
    return updated;
  },
});
