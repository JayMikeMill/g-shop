// App.tsx
import SiteHeader from "./site/SiteHeader";
import SiteFooter from "./site/SiteFooter";
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
