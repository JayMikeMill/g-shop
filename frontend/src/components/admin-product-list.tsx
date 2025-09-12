// src/components/AdminProductList.tsx
import type { Product } from "@shared/product";
import "@css/admin-dashboard.css";

interface AdminProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function AdminProductList({ products, onEdit, onDelete }: AdminProductListProps) {
  return (
    <div className="table-container">
      <table className="products-table">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Image</th>
            <th style={{ textAlign: 'center' }}>Name</th>
            <th style={{ textAlign: 'center' }}>Description</th>
            <th style={{ textAlign: 'center' }}>Price</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td style={{ textAlign: 'center' }}>
                {p.images && p.images.length > 0 ? (
                  <img src={p.images[0]} alt={p.name} className="table-product-image" />
                ) : (
                  <div className="table-product-image-placeholder">No Image</div>
                )}
              </td>
              <td style={{ textAlign: 'center' }}>{p.name}</td>
              <td style={{ textAlign: 'center' }}><p className="product-description">{p.description}</p></td>
              <td style={{ textAlign: 'center' }}>${p.price.toFixed(2)}</td>
              <td className="action-buttons" style={{ textAlign: 'center' }}>
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
