import ProductCardList from "@features/products/ProductCardList";
import { useDataApi, useSiteSettings } from "@app/hooks";

export default function HomePage() {
  const { products: apiProducts } = useDataApi();
  const { siteSettings } = useSiteSettings();
  // Call the query hook directly
  const { data, isLoading } = apiProducts.getMany({ limit: 20 });

  // Use default value if data is undefined
  const products = data?.data ?? [];

  return (
    <div className="text-center pb-xl font-sans text-text">
      {siteSettings?.bannerURL && (
        <div
          className="w-full h-64 bg-cover bg-center mb-lg"
          style={{ backgroundImage: `url(${siteSettings.bannerURL})` }}
        />
      )}

      <ProductCardList products={products} isLoading={isLoading} />
    </div>
  );
}
