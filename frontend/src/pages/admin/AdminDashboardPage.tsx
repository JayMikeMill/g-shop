import { NavLink, Outlet } from "react-router-dom";
import { useUser } from "@features/user/useUser";
import { Button, buttonVariants } from "@components/ui";

export default function AdminDashboardPage() {
  const { logoutUser } = useUser();

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
      <nav className="flex gap-2 p-2 py-4 border-b border-border overflow-x-auto whitespace-nowrap">
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            buttonVariants({ variant: isActive ? "raised" : "default" })
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/admin/catalog"
          className={({ isActive }) =>
            buttonVariants({ variant: isActive ? "raised" : "default" })
          }
        >
          Catalog
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            buttonVariants({ variant: isActive ? "raised" : "default" })
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            buttonVariants({ variant: isActive ? "raised" : "default" })
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            buttonVariants({ variant: isActive ? "raised" : "default" })
          }
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
