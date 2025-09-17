import { useEffect } from "react";
import { useAdminPageHeader } from "./dashboard";
import { useAuth } from "@contexts/auth-context";
import LoginDialog from "@components/dialogs/login-dialog";

export default function Orders() {
  const { user, loading } = useAuth();
  const { setPageHeader } = useAdminPageHeader();

  useEffect(() => {
    setPageHeader(<h2 className="text-lg font-semibold m-0">Orders</h2>);
    return () => setPageHeader(null);
  }, [setPageHeader]);

  if (!loading && !user) return <LoginDialog />;

  return (
    <div className="p-lg text-text text-center">
      <p className="text-text-secondary">This page is not yet available.</p>
    </div>
  );
}
