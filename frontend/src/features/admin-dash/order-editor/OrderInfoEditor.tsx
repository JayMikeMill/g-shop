import type { Order, OrderStatus } from "@shared/types";

type OrderInfoEditorProps = {
  order: Order;
  setOrder: (o: Order) => void;
};

export default function OrderInfoEditor({
  order,
  setOrder,
}: OrderInfoEditorProps) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <strong>Order ID:</strong> {order.id ?? "New Order"}
      </div>
      <div>
        <strong>User ID:</strong>
        <input
          type="text"
          value={order.userId ?? ""}
          onChange={(e) => setOrder({ ...order, userId: e.target.value })}
          className="border rounded px-2 py-1 w-full"
        />
      </div>
      <div>
        <strong>Status:</strong>
        <select
          value={order.status}
          onChange={(e) =>
            setOrder({ ...order, status: e.target.value as OrderStatus })
          }
          className="border rounded px-2 py-1 mt-1 w-full"
        >
          {["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <strong>Total:</strong> ${(order.total ?? 0) / 100}
      </div>
    </div>
  );
}
