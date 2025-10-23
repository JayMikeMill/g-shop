// src/hooks/useSettings.ts
import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "@app/hooks";

import { useApi } from "@app/hooks";
import { setSiteSettings, setLoading } from "./siteSettingsSlice";
import { applyThemeColors } from "./theme";

export function useSiteSettings() {
  const { getSiteSettings } = useApi().settings;
  const dispatch = useAppDispatch();
  const siteSettings = useAppSelector(
    (state) => state.siteSettings.siteSettings
  );
  const loading = useAppSelector((state) => state.siteSettings.loading);

  // Refresh settings from API
  const fetchSettings = useCallback(async () => {
    dispatch(setLoading(true));
    console.log("Fetching site settings from API...");
    try {
      const settings = await getSiteSettings();
      dispatch(setSiteSettings(settings ?? null));
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
      dispatch(setSiteSettings(null));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, getSiteSettings]);

  return { siteSettings, loading, fetchSettings };
}
