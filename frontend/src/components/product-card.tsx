import { useCart } from "@contexts/cart-context";
import { Color, Size, type Product } from "@models/product";


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
        <div
            className="bg-white rounded-lg shadow-sm hover:shadow-lg border border-gray-200 overflow-hidden cursor-pointer transition-all duration-300"
            onClick={handleAddToCart}
        >
            <div className="relative w-full pt-[100%]">
                {product.images && product.images.length > 0 ? (
                    <img
                        src={product.images[0].preview}
                        alt={product.name}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                        No Image Available
                    </div>
                )}
                {product.tags && product.tags.length > 0 && (
                    <div className="absolute top-2 right-2 flex gap-1">
                        {product.tags.map(tag => (
                            <span
                                key={tag}
                                className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold shadow"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-base font-semibold mb-2 text-gray-900">{product.name}</h3>
                <div className="flex items-center gap-2">
                    {discountedPrice !== null && discountedPrice < product.price ? (
                        <>
                            <p className="text-sm text-gray-400 line-through">${product.price.toFixed(2)}</p>
                            <p className="text-lg text-blue-600 font-bold">${discountedPrice.toFixed(2)}</p>
                        </>
                    ) : (
                        <p className="text-lg text-blue-600 font-bold">${product.price.toFixed(2)}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
