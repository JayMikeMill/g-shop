import { useCart } from "@contexts/cart-context";
import { Color, Size, type Product } from "@models/product";
import "@css/product-card.css";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        const size = product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined;
        const color = product.colors && product.colors.length > 0 ? product.colors[0] : undefined;
        addToCart(product, { size: size as Size, color: color as Color });
    };

    let discountedPrice: number | null = null;
    if (product.discount) {
        if (typeof product.discount === 'string') {
            if (product.discount.includes('%')) {
                const percentage = parseFloat(product.discount.replace('%', ''));
                discountedPrice = product.price * (1 - percentage / 100);
            } else {
                const amount = parseFloat(product.discount);
                discountedPrice = product.price - amount;
            }
        } else if (typeof product.discount === 'number') {
            // Legacy format, a number between 0 and 1 representing a percentage
            discountedPrice = product.price * (1 - product.discount);
        }
    }

    return (
        <div className="product-card" onClick={handleAddToCart}>
            <div className="image-container">
                {product.images && product.images.length > 0 ? (
                    <img src={product.images[0].preview} alt={product.name} />
                ) : (
                    <div className="no-image">No Image Available</div>
                )}
                {product.tags && product.tags.length > 0 && (
                    <div className="tags">
                        {product.tags.map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>
                )}
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="price-container">
                    {discountedPrice !== null && discountedPrice < product.price ? (
                        <>
                            <p className="original-price">${product.price.toFixed(2)}</p>
                            <p className="discounted-price">${discountedPrice.toFixed(2)}</p>
                        </>
                    ) : (
                        <p className="product-price">${product.price.toFixed(2)}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
