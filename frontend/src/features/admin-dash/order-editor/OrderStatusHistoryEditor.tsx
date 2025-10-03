import { Button } from "@components/ui";
import type { Order, OrderStatus } from "@my-store/shared/types";

type OrderStatusHistoryEditorProps = {
  order: Order;
  setOrder: (o: Order) => void;
};

export default function OrderStatusHistoryEditor({
  order,
  setOrder,
}: OrderStatusHistoryEditorProps) {
  const addHistory = () =>
    setOrder({
      ...order,
      statusHistory: [
        ...(order.statusHistory ?? []),
        { status: "PENDING", timestamp: new Date() },
      ],
    });

  return (
    <div className="flex flex-col gap-2">
      {(order.statusHistory ?? []).map((h, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <select
            value={h.status}
            onChange={(e) => {
              const history = [...(order.statusHistory ?? [])];
              history[idx] = {
                ...history[idx],
                status: e.target.value as OrderStatus,
              };
              setOrder({ ...order, statusHistory: history });
            }}
            className="border rounded px-2 py-1"
          >
            {["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"].map(
              (s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              )
            )}
          </select>
          <input
            type="datetime-local"
            value={
              h.timestamp instanceof Date
                ? h.timestamp.toISOString().slice(0, 16)
                : h.timestamp
            }
            onChange={(e) => {
              const history = [...(order.statusHistory ?? [])];
              history[idx] = {
                ...history[idx],
                timestamp: new Date(e.target.value),
              };
              setOrder({ ...order, statusHistory: history });
            }}
            className="border rounded px-2 py-1"
          />
        </div>
      ))}
      <Button onClick={addHistory}>Add Status</Button>
    </div>
  );
}
