import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import type { SiteSettings } from "shared/settings";
import { useSiteSettings } from "@app/hooks";
import { applySettingsTheme } from "@features/site-settings/theme";

export default function App() {
  const { siteSettings, fetchSettings } = useSiteSettings();

  useEffect(() => {
    fetchSettings();
  }, []);

  // Refresh cart only once when siteSettings are first loaded
  useEffect(() => {
    if (siteSettings) {
      applySiteSettings(siteSettings);
    }
  }, [siteSettings]);

  if (!siteSettings) {
    return null;
  }

  return (
    <div>
      <main>
        <div className="bg-background sm:app-zoom">
          <AppRoutes />
        </div>
      </main>
    </div>
  );
}

function applySiteSettings(settings: SiteSettings) {
  applySettingsTheme(settings);

  console.log("Aquired settings initializing app...", settings);

  // Update title
  document.title = settings?.siteName || "My Store";

  // Update favicon
  let link: HTMLLinkElement | null =
    document.querySelector("link[rel*='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = settings.siteIconURL || "/favicon.ico";
}
