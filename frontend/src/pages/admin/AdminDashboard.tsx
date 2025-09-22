import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@contexts/auth/AuthContext";
import { createContext, useState, useContext } from "react";

// 1. Create context
const AdminPageHeaderContext = createContext({
  setPageHeader: (header: React.ReactNode) => {},
});

// Custom hook
export const useAdminPageHeader = () => useContext(AdminPageHeaderContext);

export default function AdminDashboard() {
  const { logout } = useAuth();
  const [pageHeader, setPageHeader] = useState<React.ReactNode>(null);

  return (
    <div className="flex flex-col w-full max-w-full font-sans bg-background">
      {/* Header */}
      <header className="flex justify-between items-center border-b border-input-border flex-shrink-0 p-5">
        <h1 className="text-[1.8rem] text-text m-0">Admin Dashboard</h1>
        <button onClick={logout} className="btn-danger">
          Logout
        </button>
      </header>

      {/* Navigation */}
      <nav className="flex gap-md p-5 border-b border-input-border">
        <NavLink
          to="/admin/products"
          className={({ isActive }) =>
            `px-md py-sm w-[120px] text-center rounded border border-input-border font-semibold text-text bg-card-bg transition-all duration-200 
						${isActive ? "bg-primary text-button-text border-primary" : "hover:bg-light hover:-translate-y-0.5 hover:shadow-md"}`
          }
        >
          Products
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `px-md py-sm w-[120px] text-center rounded border border-input-border font-semibold text-text bg-card-bg transition-all duration-200 
						${isActive ? "bg-primary text-button-text border-primary" : "hover:bg-light hover:-translate-y-0.5 hover:shadow-md"}`
          }
        >
          Orders
        </NavLink>
      </nav>

      {/* Optional page header */}
      {pageHeader && (
        <header className="flex justify-between items-center p-5 bg-card-bg border-b border-input-border">
          {pageHeader}
        </header>
      )}

      {/* Main content */}
      <main className="flex-grow overflow-y-auto">
        <AdminPageHeaderContext.Provider value={{ setPageHeader }}>
          <Outlet />
        </AdminPageHeaderContext.Provider>
      </main>
    </div>
  );
}
