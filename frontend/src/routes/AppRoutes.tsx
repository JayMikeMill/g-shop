// routes/AppRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";

// Admin pages
import {
  AdminLoginPage,
  AdminDashboardPage,
  AdminProductsPage,
  AdminCatalogPageWrapper,
  AdminCategoriesPage,
  AdminCollectionsPage,
  AdminOrdersPage,
  AdminUsersPage,
  AdminSettingsPage,
} from "./AdminRoutes";

// Public pages
import HomePage from "@pages/HomePage";
import ProductPage from "@pages/ProductPage";
import CheckoutPage from "@pages/CheckoutPage";
import AboutPage from "@pages/AboutPage";

// Auth & Roles
import { Roles } from "@my-store/shared/types/User";
import { ProtectedRoute } from "./ProtectedRoute";

// Scroll to top on route change
import ScrollToTop from "./ScrollToTop";

export default function AppRoutes() {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Product/:id" element={<ProductPage />} />

        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={[Roles.ADMIN]}>
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
          <Route path="settings" element={<AdminSettingsPage />} />
        </Route>
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  );
}
