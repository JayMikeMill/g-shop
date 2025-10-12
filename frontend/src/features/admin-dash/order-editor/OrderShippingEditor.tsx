import AddressForm from "@components/ui/custom/AddressForm";
import type {
  Order,
  ShippingInfo,
  ShippingCarrier,
  ShippingMethod,
  Address,
} from "@shared/types";
import {
  ShippingCarrier as ShippingCarriers,
  ShippingMethod as ShippingMethods,
  emptyAddress,
} from "@shared/types";

type OrderShippingEditorProps = {
  order: Order;
  setOrder: (o: Order) => void;
};

export default function OrderShippingEditor({
  order,
  setOrder,
}: OrderShippingEditorProps) {
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
      <AddressForm
        address={address}
        setAddress={(addr) => updateShipping({}, addr)}
        className="border rounded p-2"
      />
      {/* Shipping fields */}
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
