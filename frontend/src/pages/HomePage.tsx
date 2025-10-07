import ProductCardList from "@features/products/ProductCardList";
import ProductLoader from "@features/products/ProductLoader";
import { useApi } from "@api/useApi";

export default function HomePage() {
  const { products: apiProducts } = useApi();

  // Call the query hook directly
  const { data, isLoading, error } = apiProducts.getMany({ limit: 20 });

  // Use default value if data is undefined
  const products = data?.data ?? [];

  return (
    <div className="text-center py-xl px-md font-sans text-text">
      <h1 className="text-heading-lg font-bold text-title mb-md">
        Explore Our Collection
      </h1>
      <p className="text-body-lg text-text-secondary mb-lg">
        Find the perfect products for you, from our wide range of items.
      </p>

      {isLoading ? <ProductLoader /> : <ProductCardList products={products} />}
      {error && (
        <div className="text-red-500 mt-md">Failed to load products</div>
      )}
    </div>
  );
}
