// CollectionPage.tsx
// Displays a collection of products based on slug
// Supports loading state, filtering, and ordering

import ProductCardList from "@features/products/ProductCardList";
import { useDataApi } from "@app/hooks";
import { useParams, useLocation } from "react-router-dom";

export default function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  // Determine if it's a category or collection based on the path
  const domain = location.pathname.startsWith("/category/")
    ? "categories"
    : "collections";

  const api = useDataApi()[domain];

  // Directly call the query hook with a filter for the collection/category
  const { data, isLoading, error } = api.getOne({
    conditions: [{ field: "slug", operator: "=", value: slug }],
    include: ["products.images", "products.tags"],
  });

  const products = data?.products || [];

  const collectionName = data?.name || "";
  const collectionDescription = data?.description || "";

  if (process.env.NODE_ENV === "development")
    console.log(
      "CollectionPage render - domain:",
      domain,
      "slug:",
      slug,
      "data:",
      data
    );

  if (error) {
    return <div className="text-center py-xl">Failed to load products.</div>;
  }

  return (
    <div className="text-center py-xl font-sans text-text">
      <h1 className="text-heading-lg font-bold text-title mb-md">
        {`${collectionName}`}
      </h1>
      <p className="text-body-lg text-text-secondary mb-lg">
        {collectionDescription}
      </p>

      <ProductCardList products={products} isLoading={isLoading} />
    </div>
  );
}
