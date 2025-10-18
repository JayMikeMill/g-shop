// src/hooks/useSettings.ts
import { useEffect, useState, useCallback } from "react";
import type { SiteSettings } from "shared/settings";
import { useApi } from "@api";
import { applyThemeColors } from "./theme";

const SITE_SETTINGS_STORAGE_KEY = "settingsData";

export function useSiteSettings() {
  const { getSiteSettings } = useApi().settings;

  const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Refresh settings from API
  const refreshSettings = useCallback(async () => {
    setLoading(true);
    try {
      const settings = await getSiteSettings();
      if (settings) {
        setSiteSettings(settings);
        localStorage.setItem(
          SITE_SETTINGS_STORAGE_KEY,
          JSON.stringify(settings)
        );
      } else {
        setSiteSettings(null);
        localStorage.removeItem(SITE_SETTINGS_STORAGE_KEY);
      }

      applyThemeColors({
        primary: settings?.primaryColor || "#59c2ff",
        secondary: settings?.secondaryColor || "#6D28D9",
        accent: settings?.accentColor || "#10B981",
        destructive: "#EF4444",
      });
    } catch {
      setSiteSettings(null);
      localStorage.removeItem(SITE_SETTINGS_STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  // On first load: always fetch from API
  useEffect(() => {
    refreshSettings();
  }, [refreshSettings]);

  return { siteSettings, loading, refreshSettings };
}
