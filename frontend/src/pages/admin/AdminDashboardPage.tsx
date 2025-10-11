import { NavLink, Outlet } from "react-router-dom";
import { useUser } from "@features/user/useUser";
import { Button, buttonVariants } from "@components/ui";

export default function AdminDashboardPage() {
  const { logoutUser } = useUser();

  function navButtonClass(isActive: boolean) {
    return (
      buttonVariants({ variant: isActive ? "raised" : "default" }) + " w-1/5"
    );
  }

  return (
    <div className="flex flex-col w-full max-w-full font-sans bg-background">
      {/* Header */}
      <header className="flex justify-between items-center border-b border-border flex-shrink-0 px-2 py-3">
        <h1 className="text-3xl text-text ">Dashboard</h1>
        <Button variant={"destructive"} onClick={logoutUser}>
          Logout
        </Button>
      </header>

      {/* Navigation */}
      <nav className="flex gap-2 p-2 py-4 justify-center border-b border-border overflow-x-auto whitespace-nowrap">
        <NavLink
          to="/admin/products"
          className={({ isActive }) => navButtonClass(isActive)}
        >
          Products
        </NavLink>
        <NavLink
          to="/admin/catalog"
          className={({ isActive }) => navButtonClass(isActive)}
        >
          Catalog
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) => navButtonClass(isActive)}
        >
          Orders
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) => navButtonClass(isActive)}
        >
          Users
        </NavLink>
        <NavLink
          to="/admin/settings"
          className={({ isActive }) => navButtonClass(isActive)}
        >
          Settings
        </NavLink>
      </nav>

      {/* Main content */}
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
