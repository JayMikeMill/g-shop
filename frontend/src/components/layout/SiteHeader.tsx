// SiteHeader.tsx
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";

import { useState } from "react";

import { SITE } from "../../site-config";

import { useCart } from "@features/cart/useCart";
import SlideOutCart from "@features/cart/SlideOutCart";

import SiteMenu from "./SiteMenu";
import { Button } from "@components/ui";

export default function SiteHeader() {
  const navigate = useNavigate();

  //const { cart, totals } = useCart();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-card shadow sticky top-0 z-30">
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

        {/* Center: Logo + label */}
        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={SITE.logo} alt="Logo" className="max-h-10" />
        </div>

        {/* Right: Cart button (mobile) */}
        <Button
          variant={"flat"}
          className="w-12 h-full p-0"
          onClick={() => setIsCartOpen(true)}
        >
          <ShoppingCart className="text-text" size={28} />
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
