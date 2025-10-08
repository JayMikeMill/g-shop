// src/features/admin-dash/order-editor/AdminOrdersPage.tsx
import {
  AdminCrudPage,
  OrderEditorDialog,
  orderTableColumns,
} from "@features/admin-dash";
import type { Order } from "@shared/types";

// Orders page using AdminCrudPage
export default function AdminOrdersPage() {
  return (
    <AdminCrudPage<Order>
      objectsName="Orders"
      objectName="Order"
      apiKey="orders"
      columns={orderTableColumns}
      Editor={OrderEditorDialog}
      pageSize={10}
      searchable={true}
    />
  );
}
