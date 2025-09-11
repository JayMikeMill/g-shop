import { useCart, getCartTotals } from "../context/cart-context";
import { useNavigate } from "react-router-dom";
import "../css/cart-preview.css";

export default function CartPreview() {
	const navigate = useNavigate();
	const { cart, addToCart, removeFromCart, clearCart } = useCart();
	const totals = getCartTotals(cart);

	if (cart.length === 0) {
		return (
			<div className="cart-preview">
				<h2>Your cart is empty</h2>
				<button onClick={() => navigate("/")}>Continue Shopping</button>
			</div>
		);
	}

	return (
		<div className="cart-preview">
			<h2>Your Cart</h2>
			<div className="cart-items">
				{cart.map((item, index) => (
					<div className="cart-item" key={index}>
						<img src={item.image} alt={item.name} className="cart-item-image" />
						<div className="cart-item-info">
							<h3>{item.name}</h3>
							<p>Size: {item.options.size}</p>
							<p>Price: ${item.price}</p>
							<div className="quantity-controls">
								<button onClick={() => removeFromCart(item)}>-</button>
								<span>{item.quantity}</span>
								<button onClick={() => addToCart(item, item.options)}>+</button>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="cart-summary">
				<p>Total Items: {totals.totalItems}</p>
				<p>Total Price: ${totals.totalPrice.toFixed(2)}</p>
			</div>

			<div className="cart-actions">
				<button onClick={clearCart}>Clear Cart</button>
				<button onClick={() => navigate("/checkout")}>Pay Now</button>
			</div>
		</div>
	);
}
