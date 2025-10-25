import AppRoutes from "./routes/AppRoutes";
import { useSiteSettings } from "@features/site-settings/useSiteSettings";
import { useEffect } from "react";

export default function App() {
  const { siteSettings, fetchSettings } = useSiteSettings();

  useEffect(() => {
    fetchSettings();
  }, []);

  if (!siteSettings) {
    return null;
  }

  // Update title
  document.title = siteSettings?.siteName || "My Store";

  // Update favicon
  let link: HTMLLinkElement | null =
    document.querySelector("link[rel*='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }
  link.href = siteSettings.siteIconURL || "/favicon.ico";

  return (
    <div>
      <main>
        <AppRoutes />
      </main>
    </div>
  );
}
