// App.tsx
import { useLocation } from "react-router-dom";
import SiteHeader from "@components/layout/SiteHeader";
import SiteFooter from "@components/layout/SiteFooter";
import AppRoutes from "./routes/AppRoutes";

import { useSiteSettings } from "@features/site-settings/useSiteSettings";
import { useEffect } from "react";

export default function App() {
  const { refreshSettings } = useSiteSettings();

  // Refresh settings once on first load
  useEffect(() => {
    refreshSettings();
  }, [refreshSettings]);

  const location = useLocation();

  // Do not show footer on admin routes
  const adminPages = location.pathname.startsWith("/admin");

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
