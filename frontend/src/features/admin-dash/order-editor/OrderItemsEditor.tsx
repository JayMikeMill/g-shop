import { Button, Input, Label, NumberInput, XButton } from "@components/ui";
import type { Order, OrderItem } from "@shared/types";
import { floatToPrice, priceToFloat } from "@shared/utils";

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
    const items = [...(order.items ?? [])];
    items[index] = { ...items[index], [key]: value };
    setOrder({ ...order, items });
  };

  const handleAddItem = () =>
    setOrder({
      ...order,
      items: [
        ...(order.items ?? []),
        {
          id: "",
          orderId: order.id,
          product: JSON.parse('{ "id": "", "name": "", "price": 0 }'),
          quantity: 1,
          price: 0,
        },
      ],
    });

  const handleRemoveItem = (index: number) => {
    const items = [...(order.items ?? [])];
    items.splice(index, 1);
    setOrder({ ...order, items });
  };

  return (
    <div className="flex flex-col gap-2">
      <Label>Order Items:</Label>
      {order.items?.map((item, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <Input
            type="text"
            placeholder="Product"
            value={item.product.name}
            onChange={(e) =>
              handleItemChange(
                idx,
                "product",
                JSON.parse(e.target.value || "{}")
              )
            }
            className="border rounded px-2 py-1 flex-1"
          />
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              handleItemChange(idx, "quantity", Number(e.target.value))
            }
            className="border rounded px-2 py-1 w-16 text-center"
          />
          <NumberInput
            value={priceToFloat(item.price)}
            onChange={(value) =>
              handleItemChange(idx, "price", floatToPrice(Number(value)))
            }
            className="border rounded px-2 py-1 w-24"
          />
          <XButton onClick={() => handleRemoveItem(idx)} />
        </div>
      ))}
      <Button onClick={handleAddItem}>Add Item</Button>
    </div>
  );
}
