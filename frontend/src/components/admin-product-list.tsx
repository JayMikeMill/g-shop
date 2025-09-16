// src/components/AdminProductList.tsx
import type { Product } from "@models/product";


interface AdminProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function AdminProductList({ products, onEdit, onDelete }: AdminProductListProps) {

    const formatDiscount = (discount: string | number | undefined): string => {
        if (!discount) return 'N/A';

        if (typeof discount === 'string') {
            if (discount.includes('%')) {
                const value = parseFloat(discount.replace('%', ''));
                return `-${value}%`;
            } else {
                const value = parseFloat(discount);
                return `-$${value.toFixed(2)}`;
            }
        } else { // Fallback for legacy number-based discounts
            return `-${(discount * 100).toFixed(0)}%`;
        }
    };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse mt-4 bg-white shadow table-auto">
        <thead>
          <tr>
            <th className="bg-gray-100 font-semibold text-gray-700 uppercase text-xs py-3 px-4 text-center sticky top-0 z-10">Image</th>
            <th className="bg-gray-100 font-semibold text-gray-700 uppercase text-xs py-3 px-4 text-center sticky top-0 z-10">Name</th>
            <th className="bg-gray-100 font-semibold text-gray-700 uppercase text-xs py-3 px-4 text-center sticky top-0 z-10">Price</th>
            <th className="bg-gray-100 font-semibold text-gray-700 uppercase text-xs py-3 px-4 text-center sticky top-0 z-10">Tags</th>
            <th className="bg-gray-100 font-semibold text-gray-700 uppercase text-xs py-3 px-4 text-center sticky top-0 z-10">Description</th>
            <th className="bg-gray-100 font-semibold text-gray-700 uppercase text-xs py-3 px-4 text-center sticky top-0 z-10">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="py-3 px-4 align-top">
                {p.images && p.images.length > 0 ? (
                  <img src={p.images[0].thumbnail} alt={p.name} className="w-20 h-20 object-cover rounded" />
                ) : (
                  <div className="w-20 h-20 flex items-center justify-center bg-gray-100 text-gray-400 text-xs rounded">No Image</div>
                )}
              </td>
              <td className="py-3 px-4 align-top font-medium text-gray-900">{p.name}</td>
              <td className="py-3 px-4 align-top">
                <div className="flex flex-col items-center">
                    <span>${p.price.toFixed(2)}</span>
                    {p.discount && <span className="text-red-600 text-sm">{formatDiscount(p.discount)}</span>}
                </div>
              </td>
              <td className="py-3 px-4 align-top max-w-[250px]">
                {p.tags && p.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                        {p.tags.map(tag => <span key={tag} className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold shadow">{tag}</span>)}
                    </div>
                ) : 'N/A'}
              </td>
              <td className="py-3 px-4 align-top"><p className="text-gray-700 text-sm">{p.description}</p></td>
              <td className="py-3 px-4 align-top flex gap-2">
                <button className="px-3 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition" onClick={() => onEdit(p)}>Edit</button>
                <button className="px-3 py-1 rounded bg-red-600 text-white font-semibold hover:bg-red-700 transition" onClick={() => onDelete(p)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
