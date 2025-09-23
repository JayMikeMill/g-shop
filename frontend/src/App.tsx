import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import SiteHeader from "@components/SiteHeader";
import SiteFooter from "@components/SiteFooter";
import HomePage from "@pages/HomePage";
import ProductPage from "@pages/ProductPage";
import CheckoutPage from "@pages/CheckoutPage";
import AboutPage from "./pages/AboutPage";

import AdminDashboard from "@pages/admin/AdminDashboard";
import AdminProductsDash from "@pages/admin/Products";
import AdminOrdersDash from "@pages/admin/Orders";

import { applyTheme } from "./theme";
import { ProtectedRoute } from "@pages/ProtectedRoute";
import { Roles } from "../../shared/types/User";

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
            <Route path="/Product/:id" element={<ProductPage />} />
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
