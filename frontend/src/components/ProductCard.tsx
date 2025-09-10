import { useState } from "react"
import { useCart } from "../context/CartContext"
import { Size, type Product } from "../types/product"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart() // ✅ call at top level

  	// State for selected size and color
	const [selectedSize, setSelectedSize] = useState(product.sizes[0])
	//const [selectedColor, setSelectedColor] = useState(product.colors[0])
  
  const handleAddToCart = () => {
    const size = product.sizes[0] // default size for now
    const color = product.colors[0] // default size for now
    addToCart(product, {size: selectedSize, color})
    console.log("PRDUCT ADDED", product, {size, color})
  }

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} width={150} />
      <p>${product.price}</p>
      <select
        value={selectedSize}
				onChange={e => setSelectedSize(e.target.value as Size)}
      >
        {product.sizes.map((size) => (
          <option key={size} value={size}>{size}</option>
        ))}
      </select>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  )
}
