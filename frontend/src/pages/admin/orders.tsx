// frontend/src/pages/admin/orders.tsx
import { useEffect } from 'react';
import { useAdminPageHeader } from './dashboard';
import { useAuth } from "@contexts/auth-context";
import LoginDialog from "@components/dialogs/login-dialog";

export default function Orders() {
  const { user, loading } = useAuth();
  const { setPageHeader } = useAdminPageHeader();

  useEffect(() => {
    setPageHeader(<h2>Orders</h2>);
    return () => setPageHeader(null);
  }, [setPageHeader]);

  if (!loading && !user) {
    return <LoginDialog />;
  }

  return (
    <div className="admin-orders-page">
        <p>This page is not yet available.</p>
    </div>
  );
}
