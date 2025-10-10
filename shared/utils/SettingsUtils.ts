import {
  Settings,
  AdminSettings,
  SiteSettings,
  UserSettings,
} from "shared/types";

export function parseSettings(
  settings: Settings
): AdminSettings | SiteSettings | UserSettings {
  const parsedSettings = JSON.parse(JSON.stringify(settings.settings || {}));

  switch (settings.scope) {
    case "SITE":
      return parsedSettings as SiteSettings;
    case "USER":
      return parsedSettings as UserSettings;
    case "ADMIN":
      return parsedSettings as AdminSettings;
    default:
      throw new Error("Invalid settings scope");
  }
}
