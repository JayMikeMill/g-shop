import { SITE } from "../config";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart, getCartTotals } from "@contexts/cart-context";
import { useState } from "react";

export default function SiteHeader() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const cartTotals = getCartTotals(cart);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-surface shadow sticky top-0 z-30">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-md py-sm">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={SITE.logo}
            alt="Logo"
            className="h-10 w-10 object-contain"
          />
          <div className="text-lg font-bold text-text">{SITE.name}</div>
        </div>

        {/* Navigation icons */}
        <nav className="flex items-center gap-4">
          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="text-text" size={24} />
            {cartTotals.totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-white rounded-full text-xs px-2 py-0.5">
                {cartTotals.totalItems}
              </span>
            )}
          </div>
          <button
            className="p-2 rounded hover:bg-surface-hover"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="text-text" size={24} />
            ) : (
              <Menu className="text-text" size={24} />
            )}
          </button>
        </nav>
      </div>

      {/* Slide-out mobile menu */}
      {isMenuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-40 flex flex-col items-end">
          <div className="bg-surface w-2/3 max-w-xs h-full shadow-lg p-lg flex flex-col gap-4">
            <a
              href="/"
              className="text-lg font-medium text-text hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="/about"
              className="text-lg font-medium text-text hover:underline"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
