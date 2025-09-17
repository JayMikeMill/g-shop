import type { JSX } from "react";
import { useAuth } from "@contexts/auth-context";
import LoginDialog from "@components/dialogs/login-dialog";
import { type Role } from "@models/user";

interface ProtectedRouteProps {
  allowedRoles: Role[];
  children: JSX.Element;
}

export function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user || !user.role || !allowedRoles.includes(user.role))
    return <LoginDialog />;

  return children;
}
