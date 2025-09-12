// frontend/src/pages/admin/orders.tsx
import { useEffect } from 'react';
import { useAdminPageHeader } from './dashboard';

export default function Orders() {
  const { setPageHeader } = useAdminPageHeader();

  useEffect(() => {
    setPageHeader(<h2>Orders</h2>);
    // Clear the header when the component unmounts
    return () => setPageHeader(null);
  }, [setPageHeader]);

  return (
    <div className="admin-orders-page">
        <p>This page is not yet available.</p>
    </div>
  );
}
