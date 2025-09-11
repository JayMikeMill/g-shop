import { useState } from "react"
import { useCart } from "../context/cart-context"
import { Size, type Product } from "../../../shared/product"
import "../css/product-card.css" // import the CSS

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const [selectedSize, setSelectedSize] = useState(product.sizes[0])

  const handleAddToCart = () => {
    const size = selectedSize
    const color = product.colors[0] // default color
    addToCart(product, { size, color })
  }

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      
      <div className="card-row">
        <p className="price">${product.price}</p>
        <select
          value={selectedSize}
          onChange={e => setSelectedSize(e.target.value as Size)}
        >
          {product.sizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  )
}
