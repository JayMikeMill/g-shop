import { useFormContext } from "react-hook-form";

const OrderTransactionForm: React.FC = () => {
  const { register } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <input
        type="number"
        placeholder="Amount (cents)"
        {...register("transaction.amount", { valueAsNumber: true })}
        className="border rounded px-2 py-1 w-full"
      />
      <input
        type="text"
        placeholder="Currency"
        {...register("transaction.currency")}
        className="border rounded px-2 py-1 w-full"
      />
      <select
        {...register("transaction.method")}
        className="border rounded px-2 py-1 w-full"
      >
        {/* Payment method options */}
      </select>
      <select
        {...register("transaction.status")}
        className="border rounded px-2 py-1 w-full"
      >
        {/* Transaction status options */}
      </select>
    </div>
  );
};

export default OrderTransactionForm;
