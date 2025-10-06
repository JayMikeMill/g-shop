import type {
  Order,
  OrderShippingInfo,
  ShippingCarrier,
  ShippingMethod,
} from "@my-store/shared";

import {
  emptyOrderShippingInfo,
  ShippingCarrier as ShippingCarriers,
} from "@my-store/shared";
import { ShippingMethod as ShippingMethods } from "@my-store/shared";

type OrderShippingEditorProps = {
  order: Order;
  setOrder: (o: Order) => void;
};

export default function OrderShippingEditor({
  order,
  setOrder,
}: OrderShippingEditorProps) {
  // Ensure shippingInfo exists
  const shippingInfo: OrderShippingInfo = order.shippingInfo || {
    ...emptyOrderShippingInfo,
    orderId: order.id,
  };

  const updateShipping = (updates: Partial<OrderShippingInfo>) =>
    setOrder({
      ...order,
      shippingInfo: { ...shippingInfo, ...updates },
    });

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Name"
        value={shippingInfo.name}
        onChange={(e) => updateShipping({ name: e.target.value })}
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="text"
        placeholder="Phone"
        value={shippingInfo.phone}
        onChange={(e) => updateShipping({ phone: e.target.value })}
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="text"
        placeholder="Street"
        value={shippingInfo.line1}
        onChange={(e) => updateShipping({ line1: e.target.value })}
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="text"
        placeholder="City"
        value={shippingInfo.city}
        onChange={(e) => updateShipping({ city: e.target.value })}
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="text"
        placeholder="State"
        value={shippingInfo.state}
        onChange={(e) => updateShipping({ state: e.target.value })}
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="text"
        placeholder="Postal Code"
        value={shippingInfo.postalCode}
        onChange={(e) => updateShipping({ postalCode: e.target.value })}
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="text"
        placeholder="Country"
        value={shippingInfo.country}
        onChange={(e) => updateShipping({ country: e.target.value })}
        className="border rounded px-2 py-1 w-full"
      />
      <select
        value={shippingInfo.carrier || ""}
        onChange={(e) =>
          updateShipping({ carrier: e.target.value as ShippingCarrier })
        }
        className="border rounded px-2 py-1 w-full"
      >
        <option value="">Select Carrier</option>
        {Object.keys(ShippingCarriers).map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select
        value={shippingInfo.method || ""}
        onChange={(e) =>
          updateShipping({ method: e.target.value as ShippingMethod })
        }
        className="border rounded px-2 py-1 w-full"
      >
        <option value="">Select Method</option>
        {Object.keys(ShippingMethods).map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Tracking #"
        value={shippingInfo.tracking || ""}
        onChange={(e) => updateShipping({ tracking: e.target.value })}
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="number"
        placeholder="Cost (cents)"
        value={shippingInfo.cost ?? 0}
        onChange={(e) => updateShipping({ cost: Number(e.target.value) })}
        className="border rounded px-2 py-1 w-full"
      />
    </div>
  );
}
