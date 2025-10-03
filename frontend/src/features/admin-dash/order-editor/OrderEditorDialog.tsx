import { AnimatedDialog } from "@components/ui";
import type { CrudEditorInterface } from "@features/admin-dash";
import type { Order } from "@shared/types/Order";
import e from "cors";

// Wrapper to provide a dialog for editing orders
function OrderEditorDialog({
  open,
  item,
  onModify,
  onDelete,
  onCancel,
}: CrudEditorInterface<Order>) {
  return (
    <AnimatedDialog
      open={!!open}
      onClose={onCancel}
      title={item?.id ? "Edit Order" : "Order Details"}
      className="flex flex-col overflow-hidden pl-2 w-full h-full sm:rounded-2xl sm:max-w-3xl px-md sm:px-lg"
    >
      {/* You can create a simple form or details view for editing orders */}
      <div className="flex flex-col gap-4">
        <div>
          <strong>Order ID:</strong> {item?.id}
        </div>
        <div>
          <strong>User ID:</strong> {item?.userId}
        </div>
        <div>
          <strong>Status:</strong>
          <select
            value={item?.status}
            onChange={(e) => {
              if (!item) return;
              // Ensure all required fields are present and not undefined
              const {
                id,
                userId,
                status,
                total,
                transaction,
                shippingInfo,
                items,
                createdAt,
                updatedAt,
                user,
              } = item;
              if (
                id === undefined ||
                userId === undefined ||
                transaction === undefined ||
                shippingInfo === undefined ||
                items === undefined ||
                createdAt === undefined ||
                updatedAt === undefined
              ) {
                // Optionally handle missing required fields here
                return;
              }
              onModify({
                id,
                userId,
                status: e.target.value as Order["status"],
                total: total ?? 0,
                transaction,
                shippingInfo,
                items,
                createdAt,
                updatedAt,
                user,
              });
            }}
            className="border rounded px-2 py-1 mt-1"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <strong>Total:</strong> ${(item?.total ?? 0) / 100}
        </div>
        <div className="flex gap-2 mt-4">
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={() => item?.id && onDelete(item.id)}
          >
            Delete
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </AnimatedDialog>
  );
}

export { OrderEditorDialog };
