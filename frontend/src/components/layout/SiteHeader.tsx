// SiteHeader.tsx
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";
import { useState } from "react";

import SlideOutCart from "@features/cart/SlideOutCart";
import SiteMenu from "./SiteMenu";
import { Button, Image } from "@components/ui";
import { useUser, useCart, useSiteSettings } from "@app/hooks";

import ProductSearch from "@features/product-search/ProductSearch";

export default function SiteHeader() {
  const navigate = useNavigate();
  const { user } = useUser(); // 👈 current user context
  const { cart } = useCart(); // 👈 current cart contex
  const { siteSettings } = useSiteSettings();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Search panel state only
  const [searchPanelOpen, setSearchPanelOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const cartItemsCount = cart.totalItems || 0;

  const handleUserClick = () => {
    if (user) navigate("/account");
    else navigate("/login");
  };

  return (
    <header className="bg-surface shadow sticky top-0 z-30">
      {/* Header row */}
      <div className="w-full flex items-center h-14 justify-between px-md py-sm">
        {/* Left: Menu button (mobile) */}
        <Button
          className="w-12 h-full p-0"
          variant={"flat"}
          onClick={toggleMenu}
        >
          <Menu className="text-text" size={28} />
        </Button>

        {/* Center: Logo */}
        <div
          className="flex flex-col flex-1 items-center h-full justify-center cursor-pointer px-4"
          onClick={() => navigate("/")}
        >
          <Image
            src={siteSettings?.logoURL}
            loader={false}
            alt="Logo"
            className="h-full"
          />
        </div>

        {/* Right: Search, Login/User, Cart */}
        <div className="flex h-full items-center gap-sm">
          {/* Product search (handles all search UI and logic) */}
          <ProductSearch
            open={searchPanelOpen}
            onOpen={() => setSearchPanelOpen(true)}
            onClose={() => setSearchPanelOpen(false)}
          />

          {/* User icon or Login link */}
          {user ? (
            <div
              onClick={handleUserClick}
              className={`w-9 h-9 flex min-w-9 items-center justify-center 
                rounded-full bg-primary text-white font-bold cursor-pointer
                 hover:opacity-90 transition`}
              title={`${user.firstName} ${user.lastName}`}
            >
              {user.email?.[0]?.toUpperCase() || "?"}
            </div>
          ) : (
            <Button variant="flatLink" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}

          {/* Cart button */}
          <Button
            variant="flat"
            className="w-12 min-w-12 h-full p-0 relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="text-text" size={28} />

            {/* Item count badge */}
            {cartItemsCount > 0 && (
              <span
                className={`absolute -top-1 -right-1 inline-flex 
                  items-center justify-center w-5 h-5 text-xs font-bold 
                  text-foreground bg-accent rounded-full`}
              >
                {cartItemsCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Slide-out menu */}
      <SiteMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Slide-out cart */}
      {isCartOpen && (
        <SlideOutCart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      )}
      {/* SearchPanel now handled by ProductSearch */}
    </header>
  );
}
