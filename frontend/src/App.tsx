// App.tsx
import SiteHeader from "@components/layout/SiteHeader";
import SiteFooter from "@components/layout/SiteFooter";
import AppRoutes from "./routes/AppRoutes";

import { applyTheme } from "./styles/theme";

export default function App() {
  applyTheme("light");

  return (
    <div>
      <SiteHeader />
      <main>
        <div className="bg-background">
          <AppRoutes />
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
