// src/features/admin-dash/order-editor/AdminOrdersPage.tsx
import {
  AdminCrudPage,
  OrderEditorDialog,
  orderTable,
} from "@features/admin-dash";
import type { Order } from "shared/types";

// Orders page using AdminCrudPage
export default function AdminOrdersPage() {
  return (
    <AdminCrudPage<Order>
      objectsName="Orders"
      objectName="Order"
      apiKey="orders"
      tableLayout={orderTable}
      Editor={OrderEditorDialog}
      pageSize={3}
      searchable={true}
    />
  );
}
