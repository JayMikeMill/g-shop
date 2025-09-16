// Import React Router hook for navigation between pages
import { useNavigate } from "react-router-dom";

// Import your custom cart context hooks and helper functions
import { useCart, getCartTotals } from "@contexts/cart-context";

// The ShoppingCart component displays the user's cart items and actions
export default function ShoppingCart() {
	// Hook to programmatically navigate between routes
	const navigate = useNavigate();

	// Get cart state and actions from the cart context
	const { cart, addToCart, removeFromCart, clearCart } = useCart();

	// Calculate total items and total price using helper function
	const totals = getCartTotals(cart);

	// If the cart is empty, display a message and a button to continue shopping
	if (cart.length === 0) {
		return (
			<div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow text-center mt-8">
				<h2 className="text-2xl font-bold mb-2">Your Shopping Cart is Empty</h2>
				<p className="mb-6 text-gray-600">Looks like you haven't added any items to your cart yet.</p>
				<button className="bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-primary-dark transition" onClick={() => navigate("/")}>
					Continue Shopping
				</button>
			</div>
		);
	}

	// Main cart display when there are items
	return (
		<div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow mt-8">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-2xl font-bold">Shopping Cart</h1>
				<button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition" onClick={clearCart}>
					Clear Cart
				</button>
			</div>

			{/* List of cart items */}
			<div className="flex flex-col gap-4 mb-8">
				{cart.map((item, index) => (
					<div className="cart-item-card" key={index}>
						<div className="item-image">
							<img src={item.images[0].thumbnail} alt={item.name} />
						</div>
						<div className="item-details">
							<h3>{item.name}</h3>
							<p className="item-option">Size: {item.options.size}</p>
							<p className="item-price">${item.price.toFixed(2)}</p>
						</div>
						<div className="item-quantity">
							<button onClick={() => removeFromCart(item)}>-</button>
							<span>{item.quantity}</span>
							<button onClick={() => addToCart(item, item.options)}>+</button>
						</div>
						<div className="item-total">
							<p>${(item.price * item.quantity).toFixed(2)}</p>
						</div>
					</div>
				))}
			</div>

			{/* Cart totals and checkout */}
			<div className="border-t pt-6 flex flex-col gap-4">
				<div className="cart-summary">
					<div className="summary-row">
						<span className="summary-label">Subtotal</span>
						<span className="summary-value">${totals.totalPrice.toFixed(2)}</span>
					</div>
					<div className="summary-row">
						<span className="summary-label">Shipping</span>
						<span className="summary-value">FREE</span>
					</div>
					<div className="summary-row total-row">
						<span className="summary-label">Total</span>
						<span className="summary-value">${totals.totalPrice.toFixed(2)}</span>
					</div>
				</div>
				<button className="bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-primary-dark transition" onClick={() => navigate("/checkout")}>
					Proceed to Checkout
				</button>
			</div>
		</div>
	);
}
