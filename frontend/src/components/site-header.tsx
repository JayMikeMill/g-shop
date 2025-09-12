import { SITE } from "../config";
import { useNavigate } from "react-router-dom";
import { Home, ShoppingCart, Menu, X } from "lucide-react";
import { useCart, getCartTotals } from "@contexts/cart-context";
import "@css/site-header.css";
import { useState } from "react";

export default function SiteHeader() {
	const navigate = useNavigate();
	const { cart } = useCart();
	const cartTotals = getCartTotals(cart);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="site-header">
			<div className="header-inner">
				{/* Logo */}
				<div className="logo" onClick={() => navigate("/")}>
					<img src={SITE.logo} alt="Logo" />
					<div className="site-name">{SITE.name}</div>
				</div>

				{/* Navigation icons */}
				<nav className="header-nav">
					<div className="cart-icon" onClick={() => navigate("/cart")}>
						<ShoppingCart size={24} />
						{cartTotals.totalItems > 0 && (
							<span className="cart-badge">{cartTotals.totalItems}</span>
						)}
					</div>
					<button className="icon-btn" onClick={toggleMenu}>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</nav>
			</div>
			{isMenuOpen && (
				<div className="mobile-menu">
					<a href="/" onClick={() => setIsMenuOpen(false)}>Home</a>
					<a href="/about" onClick={() => setIsMenuOpen(false)}>About</a>
				</div>
			)}
		</header>
	);
}
