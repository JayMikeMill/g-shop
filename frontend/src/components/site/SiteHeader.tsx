// SiteHeader.tsx
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart, getCartTotals } from "@contexts/CartContext";
import { useState } from "react";

import { SITE } from "../../site-config";
import SlideOutCart from "@components/shopping-cart/SlideOutCart";
import SiteMenu from "@components/site/SiteMenu";
import { Button } from "@components/ui";

export default function SiteHeader() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const cartTotals = getCartTotals(cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-card shadow sticky top-0 z-30">
      {/* Header row */}
      <div className="w-full flex items-center justify-between px-md py-sm">
        {/* Left: Menu button (mobile) */}
        <Button variant={"flat"} onClick={toggleMenu}>
          <Menu className="text-text" size={24} />
        </Button>

        {/* Center: Logo + label */}
        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={SITE.logo} alt="Logo" className="max-h-10" />
        </div>

        {/* Left: Cart button (mobile) */}
        <Button variant={"flat"} onClick={() => setIsCartOpen(true)}>
          <ShoppingCart className="text-text" size={24} />
        </Button>
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
    </header>
  );
}
