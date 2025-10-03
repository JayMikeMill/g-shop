import type { Collection } from "@shared/types/Catalog";
import type { Order } from "@shared/types/Order";
import { priceToFloat, type Product } from "@shared/types/Product";

const productTableColumns = [
  {
    id: "image",
    label: "Image",
    width: "120px",
    render: (p: Product) =>
      p.images?.[0] ? (
        <div className="flex items-center justify-center">
          <img
            src={p.images[0].thumbnail}
            className="w-20 h-20 object-cover rounded"
          />
        </div>
      ) : (
        <div className="w-20 h-20 flex items-center justify-center bg-light rounded text-xs">
          No Image
        </div>
      ),
  },
  {
    id: "name",
    label: "Name",
    width: "120px",
    sortable: true,
    render: (p: Product) => (
      <div className="flex items-center justify-center">
        <span className="font-semibold text-center text-text">{p.name}</span>
      </div>
    ),
  },
  {
    id: "price",
    label: "Price",
    sortable: true,
    render: (p: Product) => (
      <div className="flex flex-col items-center justify-center">
        <span className="font-semibold text-center text-text">
          {priceToFloat(p.price).toFixed(2)}
        </span>
        <span className="font-semibold text-center text-red-400">
          {`-${p.discount}`}
        </span>
      </div>
    ),
  },
  {
    id: "tags",
    label: "Tags",
    width: "120px",
    render: (p: Product) => (
      <div className="flex items-center justify-center">
        <span className="font-semibold text-center text-text">
          {p.tags?.join(", ") || "N/A"}
        </span>
      </div>
    ),
  },
  {
    id: "description",
    label: "Description",
    width: "300px",
    render: (p: Product) => (
      <div className="flex items-top justify-left">
        <span className="font-semibold text-center text-text">
          {p.description}
        </span>
      </div>
    ),
  },
];

const orderTableColumns = [
  {
    id: "id",
    label: "Order ID",
    width: "150px",
    render: (o: Order) => <span className="font-semibold">{o.id}</span>,
  },
  {
    id: "userId",
    label: "User ID",
    width: "120px",
    render: (o: Order) => <span className="font-semibold">{o.userId}</span>,
  },
  {
    id: "status",
    label: "Status",
    width: "120px",
    render: (o: Order) => <span className="font-semibold">{o.status}</span>,
  },
  {
    id: "total",
    label: "Total",
    width: "100px",
    render: (o: Order) => (
      <span className="font-semibold">${o.total / 100}</span>
    ),
  },
  {
    id: "createdAt",
    label: "Created",
    width: "180px",
    render: (o: Order) => (
      <span className="font-semibold">
        {new Date(o.createdAt).toLocaleString()}
      </span>
    ),
  },
  {
    id: "updatedAt",
    label: "Updated",
    width: "180px",
    render: (o: Order) => (
      <span className="font-semibold">
        {new Date(o.updatedAt).toLocaleString()}
      </span>
    ),
  },
];

const collectionTableColumns = [
  { id: "name", label: "Name", render: (row: Collection) => row.name },
  { id: "slug", label: "Slug", render: (row: Collection) => row.slug },
  {
    id: "description",
    label: "Description",
    render: (row: Collection) => row.description?.slice(0, 50) + "...",
  },
];

export { productTableColumns, orderTableColumns, collectionTableColumns };
