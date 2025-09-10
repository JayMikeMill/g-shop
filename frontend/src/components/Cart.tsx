import { type CartItem } from "../context/CartContext"

interface CartProps {
  cart: CartItem[]
}

export default function Cart({ cart }: CartProps) {
  const total = cart.reduce((sum, item) => sum + item.price, 0)
  return (
    <div className="cart">
      <h2>Cart</h2>
      {cart.map((item, index) => (
        <div key={index}>
          {item.name} - {item.options.size} - ${item.price}
        </div>
      ))}
      <h3>Total: ${total}</h3>
    </div>
  )
}
