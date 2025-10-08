import type { JSX } from "react";
import { useUser } from "@features/user/useUser";
import { Navigate, useLocation } from "react-router-dom";
import type { UserRole } from "@shared/types";

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children: JSX.Element;
}

export function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const location = useLocation();
  const { user, loading } = useUser();

  if (loading) {
    return null; // or a spinner while auth is being checked
  }

  const notAuth = !user || !user.role || !allowedRoles.includes(user.role);

  if (notAuth) {
    // Redirect to login page, remember where the user tried to go
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return children;
}
