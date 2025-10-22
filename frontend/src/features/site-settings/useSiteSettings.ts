// src/hooks/useSettings.ts
import { useEffect, useState, useCallback } from "react";
import type { SiteSettings } from "shared/settings";
import { useApi } from "@api";
import { applyThemeColors } from "./theme";

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
      } else {
        setSiteSettings(null);
      }

      applyThemeColors(
        {
          background: settings?.backgroundColor || "#ffffff",
          backgroundAlt: settings?.backgroundAltColor || "#f0f0f0",
          foreground: settings?.foregroundColor || "#f5f5f5",
          foregroundAlt: settings?.foregroundAltColor || "#333333",
          surface: settings?.surfaceColor || "#ffffff",
          surfaceAlt: settings?.surfaceAltColor || "#f5f5f5",
          primary: settings?.primaryColor || "#59c2ff",
          secondary: settings?.secondaryColor || "#6D28D9",
          border: settings?.borderColor || "#e0e0e0",
          accent: settings?.accentColor || "#10B981",
          destructive: "#EF4444",
        },
        {
          primary: true,
          secondary: true,
          accent: true,
          destructive: true,
        }
      );
    } catch {
      setSiteSettings(null);
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
