import ProductCard from "@components/product-card";
import type { Product } from "@shared/types/product";

interface ProductCardListProps {
  products: Product[];
}

export default function ProductCardList({ products }: ProductCardListProps) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-0">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
