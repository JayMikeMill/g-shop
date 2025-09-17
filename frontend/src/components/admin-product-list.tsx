import type { Product } from "@models/product";

interface AdminProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function AdminProductList({
  products,
  onEdit,
  onDelete,
}: AdminProductListProps) {
  const formatDiscount = (discount: string | number | undefined): string => {
    if (!discount) return "N/A";

    if (typeof discount === "string") {
      if (discount.includes("%")) {
        const value = parseFloat(discount.replace("%", ""));
        return `-${value}%`;
      } else {
        const value = parseFloat(discount);
        return `-$${value.toFixed(2)}`;
      }
    } else {
      // legacy number discount
      return `-${(discount * 100).toFixed(0)}%`;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse mt-4 bg-card shadow table-auto">
        <thead>
          <tr className="bg-light">
            <th className="font-semibold text-text-secondary uppercase text-xs py-3 px-4 text-center sticky top-0 z-10">
              Image
            </th>
            <th className="font-semibold text-text-secondary uppercase text-xs py-3 px-4 text-center sticky top-0 z-10">
              Name
            </th>
            <th className="font-semibold text-text-secondary uppercase text-xs py-3 px-4 text-center sticky top-0 z-10">
              Price
            </th>
            <th className="font-semibold text-text-secondary uppercase text-xs py-3 px-4 text-center sticky top-0 z-10">
              Tags
            </th>
            <th className="font-semibold text-text-secondary uppercase text-xs py-3 px-4 text-center sticky top-0 z-10">
              Description
            </th>
            <th className="font-semibold text-text-secondary uppercase text-xs py-3 px-4 text-center sticky top-0 right-0 bg-light z-20">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="hover:bg-light/70">
              {/* Image */}
              <td className="px-4 py-2 align-top">
                <div className="flex flex-col items-center justify-start">
                  {p.images && p.images.length > 0 ? (
                    <img
                      src={p.images[0].thumbnail}
                      alt={p.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ) : (
                    <div className="w-20 h-20 flex items-center justify-center bg-light text-text-secondary text-xs rounded">
                      No Image
                    </div>
                  )}
                </div>
              </td>

              {/* Name */}
              <td className="px-4 py-2 align-top text-center font-medium text-text">
                <div className="flex flex-col items-center justify-start">
                  {p.name}
                </div>
              </td>

              {/* Price / Discount */}
              <td className="px-4 py-2 align-top">
                <div className="flex flex-col items-center justify-start gap-1">
                  <span>${p.price.toFixed(2)}</span>
                  {p.discount && (
                    <span className="text-danger text-sm">
                      {formatDiscount(p.discount)}
                    </span>
                  )}
                </div>
              </td>

              {/* Tags */}
              <td className="px-4 py-2 align-top">
                <div className="flex flex-wrap justify-center gap-1">
                  {p.tags && p.tags.length > 0 ? (
                    p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-primary text-button-text px-2 py-1 rounded text-xs font-semibold shadow"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-center w-full">N/A</span>
                  )}
                </div>
              </td>

              {/* Description */}
              <td className="px-4 py-2 align-top">
                <div className="flex flex-col justify-start">
                  <p className="text-text-secondary text-sm">{p.description}</p>
                </div>
              </td>

              {/* Action Buttons - sticky right */}
              <td className="px-4 py-2 align-top sticky right-0 bg-card z-20">
                <div className="flex flex-col items-center justify-start gap-2">
                  <button
                    className="btn-secondary m-0"
                    onClick={() => onEdit(p)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn-danger m-0"
                    onClick={() => onDelete(p)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
