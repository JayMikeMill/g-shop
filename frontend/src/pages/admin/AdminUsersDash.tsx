import { useState, useEffect } from "react";
import { useApi } from "@api/useApi";
import type { Order } from "@shared/types/Order";

import DynamicTable from "@components/DynamicTable";
import OrderDialog from "@components/dialogs/OrderDialog";

export default function AdminUsersDash() {
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [tableKey, setTableKey] = useState(0);

  const { getOrders, updateOrder } = useApi();

  const handleDialogClose = () => {
    setTableKey((prev) => prev + 1);
  };

  const handleSaveOrder = async (update: Partial<Order>) => {
    if (!editingOrder) return;
    await updateOrder(editingOrder.id, { ...editingOrder, ...update });
  };

  return (
    <div className="pt-lg pb-lg">
      <div className="p-0">
        {/* Order dialog */}
        {editingOrder && (
          <OrderDialog
            order={editingOrder}
            onClose={handleDialogClose}
            onSave={handleSaveOrder}
          />
        )}

        {/* Order list */}

        <DynamicTable
          fetchPage={getOrders}
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
