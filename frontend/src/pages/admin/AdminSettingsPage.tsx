import { useEffect, useState } from "react";
import { useApi } from "@api";

export default function AdminSettingsPage() {
  const [siteSettings, setSiteSettings] = useState<null | any>(null);

  const { settings } = useApi();

  useEffect(() => {
    async function fetchSettings() {
      const siteSettings = await settings.getSettings("SITE");
      console.log("Site Settings:", siteSettings);
      setSiteSettings(siteSettings || null);
    }
    fetchSettings();
  }, [settings]);

  console.log("Site Settings:", siteSettings);
  return <div>{JSON.stringify(siteSettings)}</div>;
}
