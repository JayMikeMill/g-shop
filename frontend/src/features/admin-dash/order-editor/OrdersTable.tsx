// src/features/admin-dash/order-editor/OrderTable.tsx
import type { Order } from "@shared/types/Order";
import { DynamicTable } from "@components/ui";

interface OrderTableProps {
  orders: Order[];
  loading?: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onRowClick?: (order: Order) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchSubmit?: () => void;
}

export function OrderTable({
  orders,
  loading,
  page = 1,
  totalPages = 1,
  onPageChange,
  onRowClick,
  searchValue,
  onSearchChange,
  onSearchSubmit,
}: OrderTableProps) {
  return (
    <DynamicTable<Order>
      data={orders}
      loading={loading}
      page={page}
      totalPages={totalPages}
      onPageChange={onPageChange}
      onRowClick={onRowClick}
      searchable={!!onSearchChange && !!onSearchSubmit}
      searchValue={searchValue}
      onSearchChange={onSearchChange}
      onSearchSubmit={onSearchSubmit}
      objectsName="Orders"
      columns={[
        {
          id: "id",
          label: "Order ID",
          width: "150px",
          sortable: true,
          render: (o) => (
            <span className="font-semibold text-text">{o.id}</span>
          ),
        },
        {
          id: "userId",
          label: "User ID",
          width: "120px",
          sortable: true,
          render: (o) => (
            <span className="font-semibold text-text">{o.userId}</span>
          ),
        },
        {
          id: "status",
          label: "Status",
          width: "120px",
          sortable: true,
          render: (o) => (
            <span className="font-semibold text-text">{o.status}</span>
          ),
        },
        {
          id: "total",
          label: "Total",
          width: "100px",
          sortable: true,
          render: (o) => (
            <span className="font-semibold text-text">
              ${(o.total / 100).toFixed(2)}
            </span>
          ),
        },
        {
          id: "createdAt",
          label: "Created",
          width: "180px",
          sortable: true,
          render: (o) => (
            <span className="font-semibold text-text">
              {new Date(o.createdAt).toLocaleString()}
            </span>
          ),
        },
        {
          id: "updatedAt",
          label: "Updated",
          width: "180px",
          sortable: true,
          render: (o) => (
            <span className="font-semibold text-text">
              {new Date(o.updatedAt).toLocaleString()}
            </span>
          ),
        },
      ]}
    />
  );
}

export default OrderTable;
