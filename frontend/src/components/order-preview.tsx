import { useCart, getCartTotals } from "../context/cart-context";
import "../css/order-preview.css";

export default function OrderPreview() {
	const { cart } = useCart();
	const totals = getCartTotals(cart);

	if (cart.length === 0) {
		return (
			<div className="order-preview">
				<p>Your cart is empty.</p>
			</div>
		);
	}

	return (
		<div className="order-preview">
			<h3>Order Summary</h3>
			<div className="order-items">
				{cart.map((item, index) => (
					<div className="order-item" key={index}>
						<img src={item.image} alt={item.name} className="order-item-image" />
						<div className="order-item-info">
							<h4>{item.name}</h4>
							<p>Size: {item.options.size}</p>
							<p>Price: ${item.price.toFixed(2)}</p>
							<p>Quantity: {item.quantity}</p>
						</div>
					</div>
				))}
			</div>
			<div className="order-summary">
				<p>Total Items: {totals.totalItems}</p>
				<p>Subtotal: ${totals.totalPrice.toFixed(2)}</p>
			</div>
		</div>
	);
}
