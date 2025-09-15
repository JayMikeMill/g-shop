import ProductList from "@components/product-list";
import ProductLoader from "@components/product-loader";
import "@css/home-page.css";
import { useEffect, useState } from "react";
import { useProducts } from "@contexts/products-context";
import type { Product } from "@models/product";

export default function HomePage() {
  const { getAllProducts } = useProducts(); // Use the context hook
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products using the context, with a limit (e.g., 20)
    const fetch = async () => {
      try {
        const result = await getAllProducts(20); // You can add a cursor for pagination if needed
        setProducts(result);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [getAllProducts]);

  return (
    <div className="home-page-container">
      <h1 className="home-page-title">Explore Our Collection</h1>
      <p className="home-page-subtitle">
        Find the perfect products for you, from our wide range of items.
      </p>
      {loading ? <ProductLoader /> : <ProductList products={products} />}
    </div>
  );
}
