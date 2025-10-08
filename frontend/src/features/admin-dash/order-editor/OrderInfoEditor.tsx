import { Label } from "@components/ui";
import type { Order, OrderStatus } from "@shared/types";
import { OrderStatus as OrderStatuses } from "@shared/types";

type OrderInfoEditorProps = {
  order: Order;
  setOrder: (o: Order) => void;
};

export default function OrderInfoEditor({
  order,
  setOrder,
}: OrderInfoEditorProps) {
  return (
    <div className="flex flex-col gap-md">
      <Label className="w-full text-center">
        Order ID:
        <Label className="text-lg">{order.id ?? "No order ID"}</Label>
      </Label>
      <Label className="w-full text-center">
        User ID:
        <Label className="text-lg">{order.userId ?? "No user ID"}</Label>
      </Label>

      <Label>
        Status:
        <select
          value={order.status}
          onChange={(e) =>
            setOrder({ ...order, status: e.target.value as OrderStatus })
          }
          className="border rounded px-2 py-1 mt-1 w-full"
        >
          {Object.values(OrderStatuses).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Label>

      <div>
        <Label className="text-md">
          Order Total:
          <Label className="text-xl">${(order.total ?? 0) / 100}</Label>
        </Label>
      </div>
    </div>
  );
}
