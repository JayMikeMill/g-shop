import type {
  Order,
  ShippingCarrier,
  ShippingMethod,
} from "@my-store/shared/types";
import {
  ShippingCarriers,
  ShippingMethods,
} from "@my-store/shared/types/Shipping";

type OrderShippingEditor = {
  order: Order;
  setOrder: (o: Order) => void;
};

export default function OrderShippingEditor({
  order,
  setOrder,
}: OrderShippingEditor) {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Delivery Method"
        value={order.shippingInfo.method}
        onChange={(e) =>
          setOrder({
            ...order,
            shippingInfo: {
              ...order.shippingInfo,
              method: e.target.value as ShippingMethod,
            },
          })
        }
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="text"
        placeholder="Name"
        value={order.shippingInfo.name || ""}
        onChange={(e) =>
          setOrder({
            ...order,
            shippingInfo: { ...order.shippingInfo, name: e.target.value },
          })
        }
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={order.shippingInfo.email || ""}
        onChange={(e) =>
          setOrder({
            ...order,
            shippingInfo: { ...order.shippingInfo, email: e.target.value },
          })
        }
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="text"
        placeholder="Phone"
        value={order.shippingInfo.phone || ""}
        onChange={(e) =>
          setOrder({
            ...order,
            shippingInfo: { ...order.shippingInfo, phone: e.target.value },
          })
        }
        className="border rounded px-2 py-1 w-full"
      />
      <select
        value={order.shippingInfo.carrier}
        onChange={(e) =>
          setOrder({
            ...order,
            shippingInfo: {
              ...order.shippingInfo,
              carrier: e.target.value as ShippingCarrier,
            },
          })
        }
        className="border rounded px-2 py-1 w-full"
      >
        {Object.keys(ShippingCarriers).map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select
        value={order.shippingInfo.method}
        onChange={(e) =>
          setOrder({
            ...order,
            shippingInfo: {
              ...order.shippingInfo,
              method: e.target.value as ShippingMethod,
            },
          })
        }
        className="border rounded px-2 py-1 w-full"
      >
        {Object.keys(ShippingMethods).map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Tracking #"
        value={order.shippingInfo.trackingNumber || ""}
        onChange={(e) =>
          setOrder({
            ...order,
            shippingInfo: {
              ...order.shippingInfo,
              trackingNumber: e.target.value,
            },
          })
        }
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="number"
        placeholder="Cost (cents)"
        value={order.shippingInfo.cost || 0}
        onChange={(e) =>
          setOrder({
            ...order,
            shippingInfo: {
              ...order.shippingInfo,
              cost: Number(e.target.value),
            },
          })
        }
        className="border rounded px-2 py-1 w-full"
      />
      <strong>Address</strong>
      {Object.entries(order.shippingInfo.address).map(([key, value]) => (
        <input
          key={key}
          type="text"
          placeholder={key}
          value={value}
          onChange={(e) =>
            setOrder({
              ...order,
              shippingInfo: {
                ...order.shippingInfo,
                address: {
                  ...order.shippingInfo.address,
                  [key]: e.target.value,
                },
              },
            })
          }
          className="border rounded px-2 py-1 w-full"
        />
      ))}
      <textarea
        placeholder="Notes"
        value={order.shippingInfo.notes || ""}
        onChange={(e) =>
          setOrder({
            ...order,
            shippingInfo: { ...order.shippingInfo, notes: e.target.value },
          })
        }
        className="border rounded px-2 py-1 w-full"
      />
    </div>
  );
}
