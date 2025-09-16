// frontend/src/pages/admin/dashboard.tsx
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '@contexts/auth-context';
import LoginDialog from '@components/dialogs/login-dialog';
import '@css/admin-dashboard.css';
import { createContext, useState, useContext } from 'react';

// 1. Create context
const AdminPageHeaderContext = createContext({
  setPageHeader: (header: React.ReactNode) => {}
});

// Custom hook for easy access
export const useAdminPageHeader = () => useContext(AdminPageHeaderContext);

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth();
  const [pageHeader, setPageHeader] = useState<React.ReactNode>(null);

  // Only allow access if user is logged in
  if (!loading && !user) {
    return <LoginDialog />;
  }

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

      {pageHeader && (
        <header className="admin-page-header">
          {pageHeader}
        </header>
      )}

      <main className="admin-content">
        <AdminPageHeaderContext.Provider value={{ setPageHeader }}>
          <Outlet />
        </AdminPageHeaderContext.Provider>
      </main>
    </div>
  );
}
