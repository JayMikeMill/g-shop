import type {
  Order,
  ShippingInfo,
  ShippingCarrier,
  ShippingMethod,
  Address,
} from "@my-store/shared";
import {
  ShippingCarrier as ShippingCarriers,
  ShippingMethod as ShippingMethods,
  emptyAddress,
} from "@my-store/shared";

type OrderShippingEditorProps = {
  order: Order;
  setOrder: (o: Order) => void;
};

export default function OrderShippingEditor({
  order,
  setOrder,
}: OrderShippingEditorProps) {
  console.log("Rendering OrderShippingEditor", order);

  // Ensure shippingInfo exists
  const shippingInfo: ShippingInfo = order.shippingInfo || {
    orderId: order.id,
    address: emptyAddress,
  };

  const updateShipping = (
    updates: Partial<ShippingInfo>,
    addressUpdates?: Partial<Address>
  ) => {
    setOrder({
      ...order,
      shippingInfo: {
        ...shippingInfo,
        ...updates,
        address: {
          ...emptyAddress,
          ...shippingInfo.address,
          ...addressUpdates,
        },
      },
    });
  };

  const address = shippingInfo.address || emptyAddress;

  return (
    <div className="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Name"
        value={address.name}
        onChange={(e) => updateShipping({}, { name: e.target.value })}
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="text"
        placeholder="Email"
        value={address.email}
        onChange={(e) => updateShipping({}, { email: e.target.value })}
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="text"
        placeholder="Phone"
        value={address.phone || ""}
        onChange={(e) => updateShipping({}, { phone: e.target.value })}
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="text"
        placeholder="Street 1"
        value={address.street1}
        onChange={(e) => updateShipping({}, { street1: e.target.value })}
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="text"
        placeholder="Street 2"
        value={address.street2 || ""}
        onChange={(e) => updateShipping({}, { street2: e.target.value })}
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="text"
        placeholder="City"
        value={address.city}
        onChange={(e) => updateShipping({}, { city: e.target.value })}
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="text"
        placeholder="State"
        value={address.state}
        onChange={(e) => updateShipping({}, { state: e.target.value })}
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="text"
        placeholder="Postal Code"
        value={address.postalCode}
        onChange={(e) => updateShipping({}, { postalCode: e.target.value })}
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="text"
        placeholder="Country"
        value={address.country}
        onChange={(e) => updateShipping({}, { country: e.target.value })}
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
