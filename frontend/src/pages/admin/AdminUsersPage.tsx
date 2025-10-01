import { useState, useEffect } from "react";
import { useApi } from "@api/useApi";
import type { Order } from "@shared/types/Order";

import { DynamicTable } from "@components/UI";

export default function AdminUsersPage() {
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [tableKey, setTableKey] = useState(0);

  const { orders } = useApi();

  const handleDialogClose = () => {
    setTableKey((prev) => prev + 1);
  };

  const handleSaveOrder = async (update: Partial<Order>) => {
    if (!editingOrder || !editingOrder.id) return;
    await orders.update({ ...editingOrder, ...update, id: editingOrder.id });
  };

  return (
    <div className="pt-lg pb-lg">
      <div className="p-0">
        {/* Order list */}

        <DynamicTable
          fetchPage={orders.getAll}
          key={tableKey}
          onRowClick={(o) => setEditingOrder(o)}
          objectsName="Users"
          pageSize={10}
          searchable={true}
          columns={[]}
        />
      </div>
    </div>
  );
}
