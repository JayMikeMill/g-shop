import ProductCardList from "@features/products/ProductCardList";
import { useDataApi, useSiteSettings, useUser } from "@app/hooks";
import type { Collection } from "shared/types";
import { CategoryBar } from "@features/collections/CategoryBar";

export default function HomePage() {
  const { collections, categories } = useDataApi();
  const { siteSettings } = useSiteSettings();
  const { isDemoUser } = useUser();

  let featCollections: Collection[] = [];
  let isLoading = false;

  const { data: catData } = categories.getMany();

  const categoriesList = catData?.data ?? [];

  if (siteSettings?.homePageCollections?.length) {
    const collectionIds = siteSettings.homePageCollections.map((c) => c.id);

    const result = collections.getMany({
      conditions: [{ field: "id", operator: "in", value: collectionIds }],
      include: ["products.images", "products.tags"],
    });
    const data = result.data;
    isLoading = result.isLoading;

    // Filter collections with products
    featCollections = (data?.data ?? []).filter(
      (c) => c.products && c.products.length > 0
    );
    // Sort collections to match homePageCollections order
    featCollections = collectionIds
      .map((id) => featCollections.find((c) => c.id === id))
      .filter(Boolean) as Collection[];
  }

  // Separate first collection and the rest
  const restCollections = featCollections;

  console.log("HomePage render - isDemoUser:", isDemoUser);
  return (
    <div className="flex flex-col text-center pb-xl font-sans text-text gap-md">
      {siteSettings?.bannerURL && (
        <div
          className="w-full h-40 max-h-64 sm:h-64 md:h-80 lg:h-96 bg-cover bg-center mb-lg"
          style={{
            backgroundImage: `url(${siteSettings.bannerURL})`,
            objectFit: "cover",
          }}
        />
      )}

      {isDemoUser && (
        <div
          className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-lg"
          role="alert"
        >
          <strong className="font-bold">Demo Mode Active!</strong>
          <span className="block sm:inline">
            {" "}
            You are logged in as a demo user.
          </span>
          {/* link to admin dashboard on new line */}
          <div>
            <a
              href="/admin"
              className="underline ml-2 font-bold text-xl text-blue-600"
            >
              Click here to go to Admin Dashboard!
            </a>
          </div>
        </div>
      )}

      {siteSettings?.bannerMessage && (
        <h1 className="text-xl sm:text-2xl font-bold mb-lg px-sm">
          {siteSettings.bannerMessage}
        </h1>
      )}

      <CategoryBar categories={categoriesList} />

      {/* Render all but the first collection horizontally */}
      <div className="flex flex-col gap-md sm:gap-lg">
        {restCollections.map((collection) => (
          <div
            key={collection.id}
            className="flex flex-col border-y bg-surface"
          >
            <h2 className="text-2xl font-semibold pt-md">{collection.name}</h2>
            <ProductCardList
              products={collection.products || []}
              isLoading={isLoading}
              horizontal
              randomize
            />
          </div>
        ))}
      </div>
    </div>
  );
}
