import type { Order, PaymentMethod, TransactionStatus } from "@my-store/shared";

type OrderTransactionEditorProps = {
  order: Order;
  setOrder: (o: Order) => void;
};

export default function OrderTransactionEditor({
  order,
  setOrder,
}: OrderTransactionEditorProps) {
  const transaction = order.transaction ?? {
    amount: 0,
    currency: "USD",
    method: "CARD" as PaymentMethod,
    status: "PENDING" as TransactionStatus,
    reference: null,
    metadata: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="number"
        placeholder="Amount (cents)"
        value={transaction.amount}
        onChange={(e) =>
          setOrder({
            ...order,
            transaction: {
              ...transaction,
              amount: Number(e.target.value),
            },
          })
        }
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="text"
        placeholder="Currency"
        value={transaction.currency}
        onChange={(e) =>
          setOrder({
            ...order,
            transaction: { ...transaction, currency: e.target.value },
          })
        }
        className="border rounded px-2 py-1 w-full"
      />

      <select
        value={transaction.method}
        onChange={(e) =>
          setOrder({
            ...order,
            transaction: {
              ...transaction,
              method: e.target.value as PaymentMethod,
            },
          })
        }
        className="border rounded px-2 py-1 w-full"
      >
        {(
          [
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
          ] as PaymentMethod[]
        ).map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>

      <select
        value={transaction.status}
        onChange={(e) =>
          setOrder({
            ...order,
            transaction: {
              ...transaction,
              status: e.target.value as TransactionStatus,
            },
          })
        }
        className="border rounded px-2 py-1 w-full"
      >
        {(["PENDING", "PAID", "REFUNDED", "FAILED"] as TransactionStatus[]).map(
          (s) => (
            <option key={s} value={s}>
              {s}
            </option>
          )
        )}
      </select>
    </div>
  );
}
