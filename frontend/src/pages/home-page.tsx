import ProductList from "@components/product-list";
import ProductLoader from "@components/product-loader";
import "@css/home-page.css";

import { useEffect, useState } from "react";
import type { Product } from "@models/product";
import { getProducts } from "@services/product-service";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products using the context, with a limit (e.g., 20)
    const fetch = async () => {
      try { // You can add a cursor for pagination if needed
        const result = await getProducts({ limit: 20 });
        setProducts(result);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [getProducts]);

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
