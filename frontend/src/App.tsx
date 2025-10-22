import { useLocation } from "react-router-dom";
import SiteHeader from "@components/layout/SiteHeader";
import SiteFooter from "@components/layout/SiteFooter";
import AppRoutes from "./routes/AppRoutes";

import { useSiteSettings } from "@features/site-settings/useSiteSettings";
import { useEffect, useState } from "react";

export default function App() {
  const { refreshSettings } = useSiteSettings();
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const adminPages = location.pathname.startsWith("/admin");

  // Refresh settings once on first load
  useEffect(() => {
    const loadSettings = async () => {
      await refreshSettings(); // wait for settings to refresh
      setLoading(false); // done loading
      console.log("Site settings loaded.");
    };
    console.log("Loading site settings...");
    loadSettings();
  }, []);

  if (loading) {
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
