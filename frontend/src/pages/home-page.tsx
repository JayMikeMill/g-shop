import ProductList from "@components/product-list"
import { products } from "@data/products"

export default function HomePage() {
  return (
		<div>
			<h1>Our Products</h1>
			<ProductList products={products} />
		</div>
	)
}
