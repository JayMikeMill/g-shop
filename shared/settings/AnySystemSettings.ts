import type { AdminSettings } from "./AdminSettings";
import type { EngineSettings } from "./EngineSettings";
import type { SiteSettings } from "./SiteSettings";

export type AnySystemSettings = SiteSettings | AdminSettings | EngineSettings;
