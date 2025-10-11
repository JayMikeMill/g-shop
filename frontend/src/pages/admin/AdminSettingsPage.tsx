import { useEffect, useState } from "react";
import { useApi } from "@api";
import SiteSettingsForm from "@features/admin-dash/settings-editor/site-settings/SiteSettingsForm";
import type { SiteSettings } from "@shared/settings";

export default function AdminSettingsPage() {
  const emptySiteSettings: SiteSettings = {
    siteName: "",
  };

  const [siteSettings, setSiteSettings] =
    useState<SiteSettings>(emptySiteSettings);

  const { settings } = useApi();

  useEffect(() => {
    async function fetchSettings() {
      const retrieved = (await settings.getSettings("SITE")) as SiteSettings;
      console.log("Site Settings:", retrieved);
      setSiteSettings(retrieved);
    }
    fetchSettings();
  }, []);

  console.log("Site Settings:", siteSettings);

  return (
    <div className="p-md max-w-3xl mx-auto">
      <SiteSettingsForm
        settings={siteSettings}
        onSave={async (newSettings) => {
          await settings.updateSettings("SITE", newSettings);
          setSiteSettings(newSettings);
        }}
      />
    </div>
  );
}
