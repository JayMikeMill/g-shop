import ProductList from "@components/product-list";
import { fetchProductsFromFirebase } from "@data/firebase-products";
import { useEffect, useState } from "react";
import type { Product } from "@shared/product";
import ProductLoader from "@components/product-loader";
import "@css/home-page.css";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      const firebaseProducts = await fetchProductsFromFirebase();
      setProducts(firebaseProducts);
      setLoading(false);
    };

    getProducts();
  }, []);

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
