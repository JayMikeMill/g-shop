import { useState, useEffect } from "react"
import { useCart } from "@contexts/cart-context"
import { type Address } from "@models/shipping-info"
import ShippingForm from "@components/shipping-form"
import PaymentFormSquare from "@components/payment-form-square"

import OrderPreview from "@components/order-preview"
import "@css/checkout-page.css"
export default function CheckoutPage() {
	const { cart: cartItems } = useCart()
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState<string | null>(null)

	const [shippingAddress, setShippingAddress] = useState<Address>({
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

	useEffect(() => {
		const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
		setTotal(subtotal + shippingCost)
	}, [cartItems, shippingCost])

	useEffect(() => {
		setShippingCost(shippingAddress.postalCode ? 5 : 0)
	}, [shippingAddress])

	return (
		<div className="checkout-form">
			<h2>Checkout</h2>
			<OrderPreview />
			
			<ShippingForm 
				shippingAddress={shippingAddress} 
				setShippingAddress={setShippingAddress} 
			/>
			
			<PaymentFormSquare 
				total={total} 
				orderItems={cartItems} 
				shippingAddress={shippingAddress} 
				setLoading={setLoading}
				setMessage={setMessage}
			/>

			{loading && (
				<div className="spinner-overlay">
					<div className="spinner"></div>
					<span>Processing payment...</span>
				</div>
			)}

			{message && (
				<div className="message-overlay">
					{message}
				</div>
			)}
		</div>
	)
}
