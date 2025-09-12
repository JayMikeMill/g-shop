// React hooks for state and lifecycle
import { useEffect, useState } from "react"

// Import shared types for shipping address and cart items
import { type ShippingAddress } from "@shared/shipping-info"
import type { StoreItem } from "@shared/store-item"

// Import component-specific CSS
import "@css/payment-form.css"

// Square environment variables (from Vite)
const SQUARE_APPLICATION_ID = import.meta.env.VITE_SQUARE_APPLICATION_ID || ""
const SQUARE_LOCATION_ID = import.meta.env.VITE_SQUARE_LOCATION_ID || ""

// Toggle between local dev server and production endpoint
const SQUARE_PAY_SERVER = false
const SQUARE_PAY_API_URL = SQUARE_PAY_SERVER ? 
  "http://localhost:4000/api/square-pay-server" : 
  "/api/square-pay"

// Extend the window object to include Square
declare global {
  interface Window { Square?: any }
}

// Props expected by the PaymentForm component
interface SquarePaymentFormProps {
  total: number                  // Total amount to charge
  orderItems: StoreItem[]          // Items in the cart
  shippingAddress: ShippingAddress
  setLoading: (loading: boolean) => void
  setMessage: (msg: string | null) => void
}

// PaymentForm component
export default function PaymentFormSquare(
  { total, orderItems, shippingAddress, setLoading, setMessage }: SquarePaymentFormProps
) {
  // State to store the Square card instance
  const [cardInstance, setCardInstance] = useState<any>(null)

  // Mapping for country codes to ISO standard
  const countryCodeMap: Record<string, string> = { US: "US", Canada: "CA", MX: "MX" }

  // Initialize Square payments when the component mounts
  useEffect(() => {
    async function initializeSquare() {
      if (!window.Square) return console.error("Square.js not loaded")
      try {
        // Initialize Square payments object
        const payments = window.Square.payments(SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID)
        const card = await payments.card()

        // Clear any previous card container content
        document.getElementById("card-container")!.innerHTML = ""

        // Attach the card form to the DOM
        await card.attach("#card-container")
        setCardInstance(card)
        
      } catch (err) {
        console.error("Square card init error:", err)
      }
    }

    initializeSquare()
  }, []) // Empty dependency array → runs once on mount

  // Generate a payment token (nonce) from the Square card form
  const handleGenerateNonce = async () => {
    if (!cardInstance) return alert("Payment form not ready yet")
    try {
      const result = await cardInstance.tokenize()
      if (result.status === "OK") return result.token

      // Show validation errors if tokenization fails
      alert("Payment info invalid: " + (result.errors?.map((e: any) => e.message).join(", ") || ""))
      return null
    } catch (err) {
      console.error("Tokenization error:", err)
      return null
    }
  }

  // Handle the payment process
  const handlePayment = async () => {
    const nonce = await handleGenerateNonce()

    if (!nonce) return alert("Could not get payment info")

    // Convert country to ISO code if necessary
    const shippingWithISO = { ...shippingAddress, country: countryCodeMap[shippingAddress.country] || shippingAddress.country }

    try {
      setLoading(true) // Show loading indicator

      // Send payment request to backend
      const response = await fetch(SQUARE_PAY_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nonce, amount: total, orderItems: orderItems, shipping: shippingWithISO })
      })

      const data = await response.json()

      // Display result message
      if (data.status === "COMPLETED") 
        setMessage("Payment successful! Order ID: " + data.orderId)
      else 
        setMessage("Payment failed: " + data.error)

    } catch (err) {
      console.error("Payment error:", err)
      setMessage("Payment could not be processed")
    } finally {
      setLoading(false)
      setTimeout(() => setMessage(null), 3000) // Clear message after 3s
    }
  }

  // Render the payment form
  return (
    <div className="payment-form">
      <h3>Payment</h3>
      <p>Total: ${total.toFixed(2)}</p>

      {/* Container for Square card input */}
      <div id="card-container" className="card-container"></div>

      {/* Button to submit payment */}
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  )
}
