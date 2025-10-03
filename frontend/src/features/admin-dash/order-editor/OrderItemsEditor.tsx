import { Button } from "@components/ui";
import type { Order, OrderItem } from "@shared/types";

type OrderItemsEditorProps = {
  order: Order;
  setOrder: (o: Order) => void;
};

export default function OrderItemsEditor({
  order,
  setOrder,
}: OrderItemsEditorProps) {
  const handleItemChange = (
    index: number,
    key: keyof OrderItem,
    value: any
  ) => {
    const items = [...order.items];
    items[index] = { ...items[index], [key]: value };
    setOrder({ ...order, items });
  };

  const handleAddItem = () =>
    setOrder({
      ...order,
      items: [
        ...order.items,
        {
          product: JSON.parse('{ "id": "", "name": "", "price": 0 }'),
          quantity: 1,
          price: 0,
        },
      ],
    });

  const handleRemoveItem = (index: number) => {
    const items = [...order.items];
    items.splice(index, 1);
    setOrder({ ...order, items });
  };

  return (
    <div className="flex flex-col gap-2">
      {order.items.map((item, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Product JSON"
            value={JSON.stringify(item.product)}
            onChange={(e) =>
              handleItemChange(
                idx,
                "product",
                JSON.parse(e.target.value || "{}")
              )
            }
            className="border rounded px-2 py-1 flex-1"
          />
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              handleItemChange(idx, "quantity", Number(e.target.value))
            }
            className="border rounded px-2 py-1 w-20"
          />
          <input
            type="number"
            value={item.price}
            onChange={(e) =>
              handleItemChange(idx, "price", Number(e.target.value))
            }
            className="border rounded px-2 py-1 w-24"
          />
          <Button variant="destructive" onClick={() => handleRemoveItem(idx)}>
            Remove
          </Button>
        </div>
      ))}
      <Button onClick={handleAddItem}>Add Item</Button>
    </div>
  );
}
