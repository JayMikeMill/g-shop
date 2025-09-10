import ProductCard from "./ProductCard"
import { type Product } from "../types/product"

interface ProductListProps {
	products: Product[]
}

export default function ProductList({ products }: ProductListProps) {
	return (
		<div
			className="product-list"
			style={{
				width: "100%",
				height: "100%",
				minHeight: "100vh",
				display: "flex",
				flexWrap: "wrap",
				gap: "20px",
				justifyContent: "center"
			}}
		>
			{products.map((product: Product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	)
}
