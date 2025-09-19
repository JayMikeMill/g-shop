import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import SiteHeader from "@components/site-header";
import SiteFooter from "@components/site-footer";
import HomePage from "@pages/home-page";
import CartPage from "@pages/cart-page";
import CheckoutPage from "@pages/checkout-page";
import AdminDashboard from "@pages/admin/dashboard";
import AboutPage from "./pages/about-page";
import Products from "@pages/admin/products";
import Orders from "@pages/admin/orders";
import { applyTheme } from "./theme";
import { ProtectedRoute } from "@pages/protected-routes";
import { Roles } from "@models/user";
import ProductPage from "@pages/product-page";

export default function App() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  applyTheme("dark");
  return (
    <div>
      <SiteHeader />
      <main>
        <div
          className="bg-surface"
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
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
            </Route>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
