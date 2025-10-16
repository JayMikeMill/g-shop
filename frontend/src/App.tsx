// App.tsx
import { useLocation } from "react-router-dom";
import SiteHeader from "@components/layout/SiteHeader";
import SiteFooter from "@components/layout/SiteFooter";
import AppRoutes from "./routes/AppRoutes";

import { applyTheme } from "./styles/theme";

export default function App() {
  applyTheme("light");
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
