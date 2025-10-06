import React, { useState, useEffect } from "react";
import { AnimatedDialog, Button, AnimatedDropdownBox } from "@components/ui";
import type { CrudEditorInterface } from "@features/admin-dash";
import { type Order, emptyOrder } from "@my-store/shared";
import OrderInfoEditor from "./OrderInfoEditor";
import OrderItemsEditor from "./OrderItemsEditor";
import OrderShippingEditor from "./OrderShippingEditor";
import OrderTransactionEditor from "./OrderTransactionEditor";
import OrderStatusHistoryEditor from "./OrderStatusHistoryEditor";

// --- Main Dialog ---
export const OrderEditorDialog: React.FC<CrudEditorInterface<Order>> = ({
  open,
  item,
  onCreate,
  onModify,
  onDelete,
  onCancel,
}) => {
  const [localOrder, setLocalOrder] = useState<Order>(item ?? emptyOrder);

  useEffect(() => {
    if (item) setLocalOrder(item);
  }, [item]);

  const handleCancel = () => onCancel();
  const handleDelete = () => {
    if (!localOrder.id) return;
    if (
      window.confirm(`Are you sure you want to delete order ${localOrder.id}?`)
    )
      onDelete(localOrder.id);
  };
  const handleSave = () => {
    if (localOrder.id) onModify(localOrder as Order & { id: string });
    else onCreate(localOrder);
  };

  return (
    <AnimatedDialog
      open={!!open}
      onClose={onCancel}
      title={item?.id ? "Edit Order" : "Create Order"}
      className="flex flex-col overflow-hidden pl-2 w-full h-full sm:rounded-2xl sm:max-w-4xl px-md sm:px-lg"
    >
      <div className="flex flex-col flex-1 overflow-hidden border-t gap-md p-xs sm:p-sd overflow-y-auto">
        <AnimatedDropdownBox title="Order Info" openInitially={true}>
          <OrderInfoEditor order={localOrder} setOrder={setLocalOrder} />
        </AnimatedDropdownBox>

        <AnimatedDropdownBox
          title={`Items (${localOrder.items?.length})`}
          openInitially={true}
        >
          <OrderItemsEditor order={localOrder} setOrder={setLocalOrder} />
        </AnimatedDropdownBox>

        <AnimatedDropdownBox title="Shipping Info" openInitially={true}>
          <OrderShippingEditor order={localOrder} setOrder={setLocalOrder} />
        </AnimatedDropdownBox>

        <AnimatedDropdownBox title="Transaction" openInitially={true}>
          <OrderTransactionEditor order={localOrder} setOrder={setLocalOrder} />
        </AnimatedDropdownBox>

        <AnimatedDropdownBox title="Status History" openInitially={true}>
          <OrderStatusHistoryEditor
            order={localOrder}
            setOrder={setLocalOrder}
          />
        </AnimatedDropdownBox>

        <AnimatedDropdownBox title="Notes" openInitially={true}>
          <OrderNotesEditor order={localOrder} setOrder={setLocalOrder} />
        </AnimatedDropdownBox>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4 justify-center">
          {localOrder.id && (
            <Button variant="destructive" onClick={handleDelete}>
              Delete Order
            </Button>
          )}
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave}>
            {localOrder.id ? "Save Changes" : "Create Order"}
          </Button>
        </div>
      </div>
    </AnimatedDialog>
  );
};

// --- Sub-editors (plain components) ---

const OrderNotesEditor: React.FC<{
  order: Order;
  setOrder: (o: Order) => void;
}> = ({ order, setOrder }) => (
  <textarea
    value={order.notes || ""}
    onChange={(e) => setOrder({ ...order, notes: e.target.value })}
    className="border rounded px-2 py-1 w-full h-24"
  />
);
