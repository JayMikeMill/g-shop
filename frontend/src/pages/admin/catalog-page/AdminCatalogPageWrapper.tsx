// AdminCatalogPageWrapper.tsx
import { NavLink, Outlet } from "react-router-dom";
import { buttonVariants } from "@components/ui";

export default function AdminCatalogPageWrapper() {
  return (
    <div className="flex flex-col w-full h-full">
      {/* Secondary Catalog Navigation */}
      <nav className="flex gap-2 p-2 py-4 border-b border-border overflow-x-auto whitespace-nowrap">
        <NavLink
          to="categories"
          className={({ isActive }) =>
            buttonVariants({ variant: isActive ? "raised" : "default" })
          }
        >
          Categories
        </NavLink>
        <NavLink
          to="collections"
          className={({ isActive }) =>
            buttonVariants({ variant: isActive ? "raised" : "default" })
          }
        >
          Collections
        </NavLink>
      </nav>

      {/* Nested catalog content */}
      <div className="flex-grow overflow-y-auto p-2">
        <Outlet />
      </div>
    </div>
  );
}
