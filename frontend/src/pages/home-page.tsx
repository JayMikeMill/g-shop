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
      try {
        const result = await getProducts({ limit: 20 });
        setProducts(result);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [getProducts]);

  return (
    <div className="text-center py-xl px-md bg-background font-sans text-text">
      <h1 className="text-heading-lg font-bold text-title mb-md">
        Explore Our Collection
      </h1>
      <p className="text-body-lg text-text-secondary mb-lg">
        Find the perfect products for you, from our wide range of items.
      </p>
      {loading ? <ProductLoader /> : <ProductList products={products} />}
    </div>
  );
}
