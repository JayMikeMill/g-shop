import { useState, useEffect } from "react"
import { useCart } from "../context/CartContext"
import { type ShippingAddress } from "../../../shared/shipping-address"
import ShippingForm from "./ShippingForm"
import PaymentForm from "./PaymentForm"

export default function CheckoutForm() {
	const { cart: cartItems } = useCart()

	const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		addressLine1: "",
		addressLine2: "",
		city: "",
		state: "",
		postalCode: "",
		country: "US"
	})

	const [shippingCost, setShippingCost] = useState(0)
	const [total, setTotal] = useState(0)

	// Calculate totals
	useEffect(() => {
		const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
		setTotal(subtotal + shippingCost)
	}, [cartItems, shippingCost])

	// Flat shipping
	useEffect(() => {
		setShippingCost(shippingAddress.postalCode ? 5 : 0)
	}, [shippingAddress])

	return (
		<div className="checkout-form" style={{ maxWidth: 600, margin: "0 auto" }}>
			<h2>Checkout</h2>
			<ShippingForm shippingAddress={shippingAddress} setShippingAddress={setShippingAddress} />
			<PaymentForm total={total} cartItems={cartItems} shippingAddress={shippingAddress} />
		</div>
	)
}
