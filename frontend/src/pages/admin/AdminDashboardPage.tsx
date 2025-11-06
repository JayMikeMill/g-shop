import { Outlet } from "react-router-dom";
import { Button } from "@components/ui";
import { useUser } from "@features/user/useUser";
import { DesktopNavBar, MobileNavBar } from "./AdminNavBar";
import { useNavigate } from "react-router-dom";

export default function AdminDashboardPage() {
  const { logout } = useUser();
  const navigate = useNavigate();

  return (
    <div className="h-[100dvh] sm:full-screen flex flex-col w-full bg-background">
      {/* Header (sticky on top) */}
      <header className="sticky top-0 z-20 flex justify-between items-center p-4 border-b border-border bg-background">
        <h1 className="text-2xl font-bold sm:hidden">Admin-Dash</h1>
        <h1 className="text-2xl font-bold hidden sm:flex">Admin Dashboard</h1>
        <div className="flex flex-row gap-2">
          <Button className="w-20" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button className="w-20" variant="destructive" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Mobile top nav (sticky below header) */}
      <div className="sm:hidden sticky top-16 z-10 bg-background">
        <MobileNavBar />
      </div>

      {/* Main layout */}
      <div className="flex flex-1 flex-col sm:flex-row overflow-hidden">
        {/* Desktop sidebar (sticky) */}
        <aside className="hidden sm:flex sm:flex-col sm:w-60 border-r border-border p-3 overflow-y-auto sticky top-16">
          <h2 className="text-lg font-semibold text-center mb-2">Navigation</h2>
          <DesktopNavBar />
        </aside>

        {/* Main content scrollable only */}
        <main className="flex flex-1 flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
