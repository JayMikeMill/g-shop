// frontend/src/pages/admin/dashboard.tsx
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '@contexts/auth-context';
import '@css/admin-dashboard.css';
import { createContext, useState, useContext } from 'react';

// 1. Create context
const AdminPageHeaderContext = createContext({
  setPageHeader: (header: React.ReactNode) => {}
});

// Custom hook for easy access
export const useAdminPageHeader = () => useContext(AdminPageHeaderContext);

export default function AdminDashboard() {
  const { logout } = useAuth();
  // 2. State for the header
  const [pageHeader, setPageHeader] = useState<React.ReactNode>(null);

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={logout} className="admin-logout-button">Logout</button>
      </header>

      <nav className="admin-nav">
        <NavLink to="/admin/products" className={({ isActive }) => `admin-button ${isActive ? 'active' : ''}`}>Products</NavLink>
        <NavLink to="/admin/orders" className={({ isActive }) => `admin-button ${isActive ? 'active' : ''}`}>Orders</NavLink>
      </nav>

      {/* 3. Render the page header here */}
      {pageHeader && (
        <header className="admin-page-header">
          {pageHeader}
        </header>
      )}

      <main className="admin-content">
        {/* 4. Provide the setter to the children */}
        <AdminPageHeaderContext.Provider value={{ setPageHeader }}>
          <Outlet />
        </AdminPageHeaderContext.Provider>
      </main>
    </div>
  );
}
