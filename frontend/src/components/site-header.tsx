import { SITE } from "../config";
import { useNavigate } from "react-router-dom";
import { Home, ShoppingCart } from "lucide-react";
import { useCart, getCartTotals } from "@contexts/cart-context";
import "@css/site-header.css";

export default function SiteHeader() {
	const navigate = useNavigate();
	const { cart } = useCart();
	const cartTotals = getCartTotals(cart);

	return (
		<header className="site-header">
			<div className="header-inner">
				{/* Logo */}
				<div className="logo" onClick={() => navigate("/")}>
					<img src={SITE.logo} alt="Logo" />
				</div>

				{/* Site name centered */}
				<div className="site-name">{SITE.name}</div>

				{/* Navigation icons */}
				<nav className="header-nav">
					<button className="icon-btn" onClick={() => navigate("/")}>
						<Home size={24} />
					</button>
					<button className="icon-btn cart-btn" onClick={() => navigate("/cart")}>
						<ShoppingCart size={24} />
						{cartTotals.totalItems > 0 && (
							<span className="cart-badge">{cartTotals.totalItems}</span>
						)}
					</button>
				</nav>
			</div>
		</header>
	);
}
