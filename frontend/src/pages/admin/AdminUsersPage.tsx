// src/features/admin-dash/order-editor/AdminOrdersPage.tsx
import {
  AdminCrudPage,
  UserEditorDialog,
  userTable,
} from "@features/admin-dash";
import type { User } from "shared/types";

// Orders page using AdminCrudPage
export default function AdminOrdersPage() {
  return (
    <AdminCrudPage<User>
      objectsName="Users"
      objectName="user"
      apiKey="users"
      tableLayout={userTable}
      Editor={UserEditorDialog}
      pageSize={10}
      searchable={true}
    />
  );
}
