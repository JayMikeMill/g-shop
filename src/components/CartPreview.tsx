import { getCartTotals, useCart } from "../context/CartContext"
import { useNavigate } from 'react-router-dom';


export default function CartPreview() {
   const navigate = useNavigate();

  return (
    <div>
      <h2>Checkout</h2>
      {useCart().cart.map((item, index) => (
        <div key={index}>
          {item.quantity}x - {item.name} - {item.options.size} - ${item.price}
        </div>
      ))}
      <div>
        Total: ${getCartTotals(useCart().cart).totalPrice}
      </div>
      <button onClick={() => navigate('/checkout')}>Pay Now</button>
    </div>
  )
}
