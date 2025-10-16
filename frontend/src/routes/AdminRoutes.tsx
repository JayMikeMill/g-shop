import { lazy, type JSX } from "react";
import { Navigate, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import { UserRoleKeys } from "@shared/types/PrismaTypes";

// Lazy imports (default exports)
const AdminLoginPage = lazy(() => import("@pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(
  () => import("@pages/admin/AdminDashboardPage")
);
const AdminProductsPage = lazy(() => import("@pages/admin/AdminProductsPage"));
const AdminOrdersPage = lazy(() => import("@pages/admin/AdminOrdersPage"));
const AdminUsersPage = lazy(() => import("@pages/admin/AdminUsersPage"));

// Wrappers
const AdminSectionWrapper = lazy(
  () => import("@pages/admin/AdminSectionWrapper")
);

// Named exports → wrap to default
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

const AdminSiteSettingsPage = lazy(() =>
  import("@pages/admin/AdminSettingsPage").then((mod) => ({
    default: mod.AdminSiteSettingsPage,
  }))
);

const AdminAdminSettingsPage = lazy(() =>
  import("@pages/admin/AdminSettingsPage").then((mod) => ({
    default: mod.AdminAdminSettingsPage,
  }))
);

export const adminRoutes: JSX.Element[] = [
  // Login route
  <Route key="login" path="/admin-login" element={<AdminLoginPage />} />,

  // Protected admin dashboard
  <Route
    key="dashboard"
    path="/admin"
    element={
      <ProtectedRoute allowedRoles={[UserRoleKeys.ADMIN]}>
        <AdminDashboardPage />
      </ProtectedRoute>
    }
  >
    {/* Default redirect */}
    <Route index element={<Navigate to="catalog" replace />} />

    {/* Catalog parent route with default */}
    <Route path="catalog">
      <Route index element={<Navigate to="products" replace />} />
      <Route path="products" element={<AdminProductsPage />} />
      <Route path="categories" element={<AdminCategoriesPage />} />
      <Route path="collections" element={<AdminCollectionsPage />} />
    </Route>

    {/* Other routes */}
    <Route path="orders" element={<AdminOrdersPage />} />
    <Route path="users" element={<AdminUsersPage />} />

    {/* Settings parent route with default */}
    <Route path="settings">
      <Route index element={<Navigate to="site" replace />} />
      <Route path="site" element={<AdminSiteSettingsPage />} />
      <Route path="admin" element={<AdminAdminSettingsPage />} />
    </Route>
  </Route>,
];
