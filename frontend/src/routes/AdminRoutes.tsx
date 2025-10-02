import { lazy } from "react";

// Default exports → just lazy import
const AdminLoginPage = lazy(() => import("@pages/admin/AdminLoginPage"));
const AdminDashboardPage = lazy(
  () => import("@pages/admin/AdminDashboardPage")
);
const AdminProductsPage = lazy(() => import("@pages/admin/AdminProductsPage"));
const AdminCatalogPageWrapper = lazy(
  () => import("@pages/admin/AdminCatalogPage")
);
const AdminOrdersPage = lazy(() => import("@pages/admin/AdminOrdersPage"));
const AdminUsersPage = lazy(() => import("@pages/admin/AdminUsersPage"));
const AdminSettingsPage = lazy(() => import("@pages/admin/AdminSettingsPage"));

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

export {
  AdminLoginPage,
  AdminDashboardPage,
  AdminProductsPage,
  AdminCatalogPageWrapper,
  AdminCategoriesPage,
  AdminCollectionsPage,
  AdminOrdersPage,
  AdminUsersPage,
  AdminSettingsPage,
};
