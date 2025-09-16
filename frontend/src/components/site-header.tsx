
import { SITE } from "../config";
import { useNavigate } from "react-router-dom";
import { Home, ShoppingCart, Menu, X } from "lucide-react";
import { useCart, getCartTotals } from "@contexts/cart-context";
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
		<header className="bg-white shadow sticky top-0 z-30">
			<div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
				{/* Logo */}
				<div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}> 
					<img src={SITE.logo} alt="Logo" className="h-10 w-10 object-contain" />
					<div className="text-lg font-bold text-gray-800">{SITE.name}</div>
				</div>

				{/* Navigation icons */}
				<nav className="flex items-center gap-4">
					<div className="relative cursor-pointer" onClick={() => navigate("/cart")}> 
						<ShoppingCart size={24} />
						{cartTotals.totalItems > 0 && (
							<span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2 py-0.5">{cartTotals.totalItems}</span>
						)}
					</div>
					<button className="p-2 rounded hover:bg-gray-100" onClick={toggleMenu}>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</nav>
			</div>
			{isMenuOpen && (
				<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-40 flex flex-col items-end">
					<div className="bg-white w-2/3 max-w-xs h-full shadow-lg p-6 flex flex-col gap-4">
						<a href="/" className="text-lg font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>Home</a>
						<a href="/about" className="text-lg font-medium hover:underline" onClick={() => setIsMenuOpen(false)}>About</a>
					</div>
				</div>
			)}
		</header>
	);
}
