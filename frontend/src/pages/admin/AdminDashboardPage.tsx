import { Outlet } from "react-router-dom";
import { useUser } from "@features/user/useUser";
import { Button, NavButton } from "@components/ui";

export default function AdminDashboardPage() {
  const { logoutUser } = useUser();

  return (
    <div className="flex flex-col w-full max-w-full font-sans bg-background">
      {/* Header */}
      <header className="flex justify-between items-center border-b border-border flex-shrink-0 px-sm py-md">
        <h1 className="text-3xl text-text">Dashboard</h1>
        <Button variant="destructive" onClick={logoutUser}>
          Logout
        </Button>
      </header>

      {/* Navigation */}
      <nav className="flex flex-row h-12 border-border overflow-x-auto whitespace-nowrap">
        <NavButton to="/admin/products" label="Products" className="w-full" />
        <NavButton to="/admin/catalog" label="Catalog" className="w-full" />
        <NavButton to="/admin/orders" label="Orders" className="w-full" />
        <NavButton to="/admin/users" label="Users" className="w-full" />
        <NavButton to="/admin/settings" label="Settings" className="w-full" />
      </nav>

      {/* Main content */}
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
