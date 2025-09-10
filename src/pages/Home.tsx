import ProductList from "../components/ProductList"
import { products } from "../data/products"

export default function Home() {
  return (
		<div>
			<h1>Our Products</h1>
			<ProductList products={products} />
		</div>
	)
}
