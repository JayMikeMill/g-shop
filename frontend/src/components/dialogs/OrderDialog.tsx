import { useState } from "react";
import type { Order, OrderStatus } from "@shared/types/Order";

interface OrderDialogProps {
  order: Order | null;
  onClose: () => void;
  onSave: (order: Partial<Order>) => Promise<void>;
}

const statusOptions: OrderStatus[] = [
  "pending",
  "paid",
  "shipped",
  "delivered",
  "cancelled",
];

export default function OrderDialog({
  order,
  onClose,
  onSave,
}: OrderDialogProps) {
  const [status, setStatus] = useState<OrderStatus>(order?.status || "pending");
  const [notes, setNotes] = useState(order?.notes || "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave({ status, notes });
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-overlay flex justify-center items-center z-50">
      <div className="bg-surface rounded-lg shadow-xl border border-border w-full max-w-md p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-center">
          {order ? "Edit Order" : "Add Order"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Status</label>
            <select
              className="w-full border border-border rounded px-3 py-2"
              value={status}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Notes</label>
            <textarea
              className="w-full border border-border rounded px-3 py-2 min-h-[60px]"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" className="btn-danger" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-success" disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
