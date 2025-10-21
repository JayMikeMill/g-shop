import ProductCardList from "@features/products/ProductCardList";
import { LoaderBar } from "@components/ui";
import { useDataApi } from "@api";

export default function HomePage() {
  const { products: apiProducts } = useDataApi();

  // Call the query hook directly
  const { data, isLoading, error } = apiProducts.getMany({ limit: 20 });

  // Use default value if data is undefined
  const products = data?.data ?? [];

  console.log("HomePage products:", products);
  return (
    <div className="text-center py-xl font-sans text-text">
      <h1 className="text-heading-lg font-bold text-title mb-md">
        Explore Our Collection
      </h1>
      <p className="text-body-lg text-text-secondary mb-lg">
        Find the perfect products for you, from our wide range of items.
      </p>

      <ProductCardList products={products} isLoading={isLoading} />
    </div>
  );
}
