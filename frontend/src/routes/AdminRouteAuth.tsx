import type { JSX } from "react";
import { useUser } from "@features/user/useUser";
import { useNavigate } from "react-router-dom";
import type { UserRole } from "shared/types";

interface AdminRouteAuthProps {
  allowedRoles: UserRole[];
  children: JSX.Element;
}

export function AdminRouteAuth({
  allowedRoles,
  children,
}: AdminRouteAuthProps) {
  const navigate = useNavigate();
  const { user, loading } = useUser();

  if (loading) {
    return null; // or a spinner while auth is being checked
  }

  const notAuth = !user || !user.role || !allowedRoles.includes(user.role);

  if (notAuth) {
    navigate("/");
    return null;
  }

  return children;
}
