import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import SiteHeader from "@components/site-header";
import SiteFooter from "@components/site-footer";
import HomePage from "@pages/home-page";
import ProductPage from "@pages/product-page";
import CheckoutPage from "@pages/checkout-page";
import AboutPage from "./pages/about-page";

import AdminDashboard from "@pages/admin/dashboard";
import AdminProductsDash from "@pages/admin/products";
import AdminOrdersDash from "@pages/admin/orders";

import { applyTheme } from "./theme";
import { ProtectedRoute } from "@pages/protected-routes";
import { Roles } from "@models/user";

export default function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  applyTheme("pastel");
  return (
    <div>
      <SiteHeader />
      <main>
        <div
          className="bg-background"
          style={{
            padding: isAdminPage ? "0px" : "20px",
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={[Roles.ADMIN]}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="products" replace />} />
              <Route path="products" element={<AdminProductsDash />} />
              <Route path="orders" element={<AdminOrdersDash />} />
            </Route>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
