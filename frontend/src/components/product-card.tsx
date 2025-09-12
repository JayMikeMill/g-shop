import { useState } from "react"
import { useCart } from "@contexts/cart-context"
import { Size, type Product } from "@shared/product"
import "@css/product-card.css"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  const [selectedSize, setSelectedSize] = useState(product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined)
  const [currentImage, setCurrentImage] = useState(0)

  const handleAddToCart = () => {
    const color = product.colors && product.colors.length > 0 ? product.colors[0] : undefined; // default color

    if (product.sizes.length > 0 && !selectedSize) {
      // a size is required, but not selected
      return;
    }

    addToCart(product, { size: selectedSize, color })
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.images && product.images.length > 1) {
      setCurrentImage(i => (i + 1) % product.images.length)
    }
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.images && product.images.length > 1) {
      setCurrentImage(i => (i - 1 + product.images.length) % product.images.length)
    }
  }

  const hasSizes = product.sizes && product.sizes.length > 0;

  return (
    <div className="product-card">
      <div className="image-container">
        {product.images && product.images.length > 0 ? (
          <img src={product.images[currentImage]} alt={`${product.name} ${currentImage + 1}`} />
        ) : (
          <div className="no-image">No Image Available</div>
        )}
        {product.images && product.images.length > 1 && (
            <>
                <button onClick={prevImage} className="nav-btn prev-btn">&lt;</button>
                <button onClick={nextImage} className="nav-btn next-btn">&gt;</button>
            </>
        )}
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <div className="product-actions">
            {hasSizes && (
              <select
                value={selectedSize}
                onChange={e => {
                  e.stopPropagation();
                  setSelectedSize(e.target.value as Size)}
                }
                className="size-select"
              >
                {product.sizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            )}
            <button 
              className="add-to-cart-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              disabled={hasSizes && !selectedSize}
            >Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
