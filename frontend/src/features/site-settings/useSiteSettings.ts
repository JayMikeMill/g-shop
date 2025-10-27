// src/hooks/useSettings.ts
import { useCallback } from "react";
import { useAppSelector, useAppDispatch, useApi } from "@app/hooks";
import { setSiteSettings, setLoading } from "./siteSettingsSlice";

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

    try {
      const settings = await getSiteSettings();
      dispatch(setSiteSettings(settings));
    } catch {
      dispatch(setSiteSettings(null));
      console.error("Failed to fetch site settings");
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, getSiteSettings]);

  return { siteSettings, loading, fetchSettings };
}
