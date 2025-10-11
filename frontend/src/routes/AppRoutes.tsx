// routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";

// Admin pages
import { adminRoutes } from "./AdminRoutes";

// Public pages
import HomePage from "@pages/HomePage";
import ProductPage from "@pages/ProductPage";
import CheckoutPage from "@pages/CheckoutPage";
import AboutPage from "@pages/AboutPage";

// Scroll to top on route change
import ScrollToTop from "./ScrollToTop";

export default function AppRoutes() {
  return (
    <div>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Product/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/about" element={<AboutPage />} />

        {adminRoutes.map((r) => r)}
      </Routes>
    </div>
  );
}
