import {
  SystemSettings,
  SystemSettingsScope,
  SiteSettings,
  AdminSettings,
  EngineSettings,
} from "@shared/types";

import { db } from "@adapters/services";

export class SystemSettingsService {
  async getSettings(
    scope: SystemSettingsScope
  ): Promise<SiteSettings | AdminSettings | EngineSettings | null> {
    const result = await db.systemSettings.getOne({ scope });

    if (!result) {
      return null;
    }
    return parseSystemSettings(result) as
      | SiteSettings
      | AdminSettings
      | EngineSettings
      | null;
  }
}

export function parseSystemSettings(
  settings: SystemSettings
): AdminSettings | SiteSettings | EngineSettings {
  const parsedSettings = JSON.parse(JSON.stringify(settings.settings || {}));

  switch (settings.scope) {
    case "SITE":
      return parsedSettings as SiteSettings;
    case "ADMIN":
      return parsedSettings as AdminSettings;
    case "ENGINE":
      return parsedSettings as EngineSettings;

    default:
      throw new Error("Invalid settings scope");
  }
}
