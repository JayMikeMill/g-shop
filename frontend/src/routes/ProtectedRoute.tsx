import type { JSX } from "react";
import { useAuth } from "@features/auth/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { type UserRole } from "@shared/types/User";

interface ProtectedRouteProps {
  allowedRoles: UserRole[];
  children: JSX.Element;
}

export function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return null; // or a spinner while auth is being checked
  }

  console.log("ProtectedRoute - user:", user);
  const notAuth = !user || !user.role || !allowedRoles.includes(user.role);

  if (notAuth) {
    console.log("ProtectedRoute - redirecting to login");
    // Redirect to login page, remember where the user tried to go
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return children;
}
