import { Request } from "express";
import { controllerHandler } from "./controllerHandler";
import { SystemSettingsService as S } from "@services";
import { AnySystemSettings, SystemSettingsScope } from "shared/settings";

// ------------------------
// Get settings by scope
// ------------------------
export const getSiteSettings = controllerHandler({
  select: (req: Request) => req.params.scope as SystemSettingsScope, // pick the scope from params
  handler: async () => {
    const result = await S.getSiteSettings();
    if (!result) throw new Error("Settings not found");
    return result;
  },
});

export const getSettings = controllerHandler({
  select: (req: Request) => req.params.scope as SystemSettingsScope, // pick the scope from params
  handler: async (scope: SystemSettingsScope) => {
    const result = await S.getSettings(scope);
    if (!result) throw new Error("Settings not found");
    return result;
  },
});
// ------------------------
// Update settings by scope
// ------------------------
export const updateSettings = controllerHandler({
  select: (req: Request) => ({
    scope: req.params.scope as SystemSettingsScope,
    settings: req.body,
  }),
  handler: async ({
    scope,
    settings,
  }: {
    scope: SystemSettingsScope;
    settings: AnySystemSettings;
  }) => {
    const updated = await S.updateSettings(scope, settings);
    return updated;
  },
});
