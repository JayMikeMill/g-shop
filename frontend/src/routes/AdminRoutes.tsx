import { lazy, type JSX } from "react";
import { Navigate, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRoleKeys } from "@shared/types/PrismaTypes";

// Default exports → just lazy import
const AdminLoginPage = lazy(() => import("@pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(
  () => import("@pages/admin/AdminDashboardPage")
);
const AdminProductsPage = lazy(() => import("@pages/admin/AdminProductsPage"));
const AdminCatalogPageWrapper = lazy(
  () => import("@pages/admin/AdminCatalogPage")
);

// Named exports → wrap in default
const AdminCategoriesPage = lazy(() =>
  import("@pages/admin/AdminCatalogPage").then((mod) => ({
    default: mod.AdminCategoriesPage,
  }))
);

const AdminCollectionsPage = lazy(() =>
  import("@pages/admin/AdminCatalogPage").then((mod) => ({
    default: mod.AdminCollectionsPage,
  }))
);

const AdminOrdersPage = lazy(() => import("@pages/admin/AdminOrdersPage"));
const AdminUsersPage = lazy(() => import("@pages/admin/AdminUsersPage"));

const AdminSettingsPageWrapper = lazy(
  () => import("@pages/admin/AdminSettingsPage")
);

// Named exports → wrap in default
const AdminAdminSettingsPage = lazy(() =>
  import("@pages/admin/AdminSettingsPage").then((mod) => ({
    default: mod.AdminAdminSettingsPage,
  }))
);

const AdminSiteSettingsPage = lazy(() =>
  import("@pages/admin/AdminSettingsPage").then((mod) => ({
    default: mod.AdminSiteSettingsPage,
  }))
);

export const adminRoutes: JSX.Element[] = [
  <Route key="login" path="/admin-login" element={<AdminLoginPage />} />,
  <Route
    key="dashboard"
    path="/admin"
    element={
      <ProtectedRoute allowedRoles={[UserRoleKeys.ADMIN]}>
        <AdminDashboardPage />
      </ProtectedRoute>
    }
  >
    <Route index element={<Navigate to="products" replace />} />
    <Route path="products" element={<AdminProductsPage />} />
    <Route path="catalog" element={<AdminCatalogPageWrapper />}>
      <Route index element={<Navigate to="categories" replace />} />
      <Route path="categories" element={<AdminCategoriesPage />} />
      <Route path="collections" element={<AdminCollectionsPage />} />
    </Route>
    <Route path="orders" element={<AdminOrdersPage />} />
    <Route path="users" element={<AdminUsersPage />} />
    <Route path="settings" element={<AdminSettingsPageWrapper />}>
      <Route index element={<Navigate to="site" replace />} />
      <Route path="site" element={<AdminSiteSettingsPage />} />
      <Route path="admin" element={<AdminAdminSettingsPage />} />
    </Route>
  </Route>,
];
