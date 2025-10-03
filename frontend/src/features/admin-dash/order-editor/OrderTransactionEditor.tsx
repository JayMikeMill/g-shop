import type { Order } from "@shared/types";

type OrderTransactionEditorProps = {
  order: Order;
  setOrder: (o: Order) => void;
};

export default function OrderTransactionEditor({
  order,
  setOrder,
}: OrderTransactionEditorProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="number"
        placeholder="Amount (cents)"
        value={order.transaction?.amount}
        onChange={(e) =>
          setOrder({
            ...order,
            transaction: {
              ...order.transaction,
              amount: Number(e.target.value),
            },
          })
        }
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="text"
        placeholder="Currency"
        value={order.transaction?.currency}
        onChange={(e) =>
          setOrder({
            ...order,
            transaction: { ...order.transaction, currency: e.target.value },
          })
        }
        className="border rounded px-2 py-1 w-full"
      />
      <select
        value={order.transaction?.method}
        onChange={(e) =>
          setOrder({
            ...order,
            transaction: {
              ...order.transaction,
              method: e.target.value as any,
            },
          })
        }
        className="border rounded px-2 py-1 w-full"
      >
        {[
          "CARD",
          "STRIPE",
          "PAYPAL",
          "SQUARE",
          "CASH",
          "APPLE_PAY",
          "GOOGLE_PAY",
          "BANK_TRANSFER",
          "AFTERPAY",
          "KLARNA",
          "BITCOIN",
          "ETHEREUM",
          "LITECOIN",
          "OTHER_CRYPTO",
          "OTHER",
        ].map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
      <select
        value={order.transaction?.status}
        onChange={(e) =>
          setOrder({
            ...order,
            transaction: {
              ...order.transaction,
              status: e.target.value as any,
            },
          })
        }
        className="border rounded px-2 py-1 w-full"
      >
        {["PENDING", "PAID", "REFUNDED", "FAILED"].map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
