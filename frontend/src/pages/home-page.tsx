
import ProductList from "@components/product-list";
import ProductLoader from "@components/product-loader";
import { useEffect, useState } from "react";
import type { Product } from "@models/product";
import { useApi } from "@api/use-api";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { getProducts } = useApi();

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
    <div className="text-center py-12 px-4">
      <h1 className="text-4xl font-bold text-primary mb-4">Explore Our Collection</h1>
      <p className="text-lg text-secondary mb-10">
        Find the perfect products for you, from our wide range of items.
      </p>
      {loading ? <ProductLoader /> : <ProductList products={products} />}
    </div>
  );
}
