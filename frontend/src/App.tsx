import { useLocation } from "react-router-dom";
import SiteHeader from "@components/layout/SiteHeader";
import SiteFooter from "@components/layout/SiteFooter";
import AppRoutes from "./routes/AppRoutes";

import { useSiteSettings } from "@features/site-settings/useSiteSettings";
import { useEffect } from "react";

export default function App() {
  const { siteSettings, fetchSettings } = useSiteSettings();
  const location = useLocation();
  const adminPages = location.pathname.startsWith("/admin");

  useEffect(() => {
    fetchSettings();
  }, []);

  if (!siteSettings) {
    return null;
  }

  return (
    <div>
      {!adminPages && <SiteHeader />}
      <main>
        <div className="bg-background">
          <AppRoutes />
        </div>
      </main>
      {!adminPages && <SiteFooter />}
    </div>
  );
}
