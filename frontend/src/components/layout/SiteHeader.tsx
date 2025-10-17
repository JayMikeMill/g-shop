// SiteHeader.tsx
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Menu } from "lucide-react";
import { useState } from "react";
import { SITE } from "../../site-config";

import SlideOutCart from "@features/cart/SlideOutCart";
import SiteMenu from "./SiteMenu";
import { Button } from "@components/ui";
import { useUser } from "@features/user/useUser";

export default function SiteHeader() {
  const navigate = useNavigate();
  const { user } = useUser(); // 👈 current user context

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleUserClick = () => {
    if (user) navigate("/account");
    else navigate("/login");
  };

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

        {/* Center: Logo */}
        <div
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={SITE.logo} alt="Logo" className="max-h-10" />
        </div>

        {/* Right: Login or User  Avatar + Cart */}
        <div className="flex h-full items-center gap-sm">
          {/* User icon or Login link */}
          {user ? (
            <div
              onClick={handleUserClick}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-primary text-white font-bold cursor-pointer hover:opacity-90 transition"
              title={`${user.firstName} ${user.lastName}`}
            >
              {user.firstName?.[0]?.toUpperCase() || "?"}
            </div>
          ) : (
            <Button variant="flatLink" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}

          {/* Cart button */}
          <Button
            variant={"flat"}
            className="w-12 h-full p-0"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="text-text" size={28} />
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
    </header>
  );
}
