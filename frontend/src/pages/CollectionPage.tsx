// CollectionPage.tsx
// Displays a collection of products based on slug
// Supports loading state, filtering, and ordering

import ProductCardList from "@features/products/ProductCardList";
import { useDataApi } from "@api";
import { useParams } from "react-router-dom";

export default function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const { categories, collections } = useDataApi();

  // Directly call the query hook with a filter for the collection/category
  const { data, isLoading, error } = categories.getOne({
    conditions: [{ field: "slug", operator: "=", value: slug }],
    include: ["products.images"],
  });

  console.log("CollectionPage data:", data, isLoading, error, slug);
  const products = data?.products || [];

  if (error) {
    return <div className="text-center py-xl">Failed to load products.</div>;
  }

  return (
    <div className="text-center py-xl px-md font-sans text-text">
      <h1 className="text-heading-lg font-bold text-title mb-md">
        {slug ? `Collection: ${slug}` : "Collection"}
      </h1>
      <p className="text-body-lg text-text-secondary mb-lg">
        Explore the products in this collection.
      </p>

      <ProductCardList products={products} isLoading={isLoading} />
    </div>
  );
}
