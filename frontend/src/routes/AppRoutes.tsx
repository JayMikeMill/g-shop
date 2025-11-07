// routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";

// Scroll to top on route change
import ScrollToTop from "./ScrollToTop";

// Admin pages
import { adminRoutes } from "./AdminRoutes";

// Public pages
import HomePage from "@pages/HomePage";
import ProductPage from "@pages/ProductPage";
import CheckoutPage from "@pages/CheckoutPage";
import AboutPage from "@pages/AboutPage";
import FAQPage from "@pages/FaqPage";

// User pages
import SignupPage from "@pages/SignupPage";
import LoginPage from "@pages/LoginPage";
import AccountPage from "@pages/AccountPage";
import OrderConfirmationPage from "@pages/OrderConfirmationPage";
import CollectionPage from "@pages/CollectionPage";
import SiteHeader from "@components/layout/SiteHeader";
import SiteFooter from "@components/layout/SiteFooter";

import { useLocation } from "react-router-dom";
import DemoModePage from "@pages/DemoModePage";
import { StoreAiBubble } from "@components/layout/StoreAiChat";

export default function AppRoutes() {
  const currentPath = useLocation().pathname;
  const adminPages = currentPath.startsWith("/admin");
  const storeAiPages =
    currentPath == "/" ||
    currentPath.startsWith("/category") ||
    currentPath.startsWith("/collection") ||
    currentPath.startsWith("/home") ||
    currentPath.startsWith("/about") ||
    currentPath.startsWith("/faq");
  return (
    <div>
      <ScrollToTop />
      {!adminPages && <SiteHeader />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category/:slug" element={<CollectionPage />} />
        <Route path="/collection/:slug" element={<CollectionPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/demo-mode" element={<DemoModePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faq" element={<FAQPage />} />
        {adminRoutes.map((r) => r)}
      </Routes>

      {!adminPages && <SiteFooter />}

      {storeAiPages && <StoreAiBubble />}
    </div>
  );
}
