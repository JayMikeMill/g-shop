// src/components/AdminProductList.tsx
import type { Product } from "@models/product";
import "@css/admin-product-list.css";

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
    <div className="table-container">
      <table className="products-table">
        <thead>
          <tr>
            <th>Image</th>
            <th className="name-cell">Name</th>
            <th className="price-cell">Price</th>
            <th>Tags</th>
            <th>Description</th>
            <th className="actions-cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>
                {p.images && p.images.length > 0 ? (
                  <img src={p.images[0]} alt={p.name} className="table-product-image" />
                ) : (
                  <div className="table-product-image-placeholder">No Image</div>
                )}
              </td>
              <td className="name-cell">{p.name}</td>
              <td className="price-cell">
                <div className="price-container">
                    <span>${p.price.toFixed(2)}</span>
                    {p.discount && <span className="discount-value">{formatDiscount(p.discount)}</span>}
                </div>
              </td>
              <td className="tags-cell">
                {p.tags && p.tags.length > 0 ? (
                    <div className="tags-container">
                        {p.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                    </div>
                ) : 'N/A'}
              </td>
              <td><p className="product-description">{p.description}</p></td>
              <td className="action-buttons actions-cell">
                <button className="edit-button" onClick={() => onEdit(p)}>Edit</button>
                <button className="delete-button" onClick={() => onDelete(p)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
