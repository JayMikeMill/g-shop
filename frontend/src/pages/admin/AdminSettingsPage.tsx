import { useState, useEffect } from "react";
import { useApi } from "@api/useApi";
import type { Order } from "@shared/types/Order";

import { DynamicTable } from "@components/UI";

export default function AdminSettingsPage() {
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [tableKey, setTableKey] = useState(0);

  const { orders } = useApi();

  const handleDialogClose = () => {
    setTableKey((prev) => prev + 1);
  };

  const handleSaveOrder = async (update: Partial<Order>) => {
    if (!editingOrder) return;
    await orders.update({
      ...editingOrder,
      ...update,
      id: editingOrder.id as string,
    });
  };

  return (
    <div className="pt-lg pb-lg">
      <div className="p-0">
        {/* Order dialog */}

        {/* Order list */}

        <DynamicTable
          fetchPage={orders.getAll}
          key={tableKey}
          onRowClick={(o) => setEditingOrder(o)}
          objectsName="Search orders..."
          pageSize={10}
          searchable={true}
          columns={[]}
        />
      </div>
    </div>
  );
}
