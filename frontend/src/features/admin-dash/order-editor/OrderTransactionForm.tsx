import { useFormContext } from "react-hook-form";

import { Label, AnimatedSelect } from "@components/ui";

import {
  TransactionStatusKeys,
  type Order,
  type TransactionStatus,
} from "shared/types";

const OrderTransactionForm: React.FC = () => {
  const { getValues, control } = useFormContext<Order>();

  return (
    <div className="flex flex-col gap-md justify-left">
      <div className="flex flex-col w-1/2">
        <Label>Transaction ID</Label>
        <Label className="font-semibold">
          {getValues("transaction.transactionRef") || "(no transaction id)"}
        </Label>
      </div>
      <div className="flex flex-row gap-md">
        <div className="flex flex-col w-1/2">
          <Label>Amount</Label>
          <Label className="font-semibold">
            {getValues("transaction.amount") !== undefined
              ? `$${(getValues("transaction.amount")! / 100).toFixed(2)}`
              : "N/A"}
          </Label>
        </div>
        <div className="flex flex-col w-1/2">
          <Label>Currency</Label>
          <Label className="font-semibold">
            {getValues("transaction.currency") || "USD"}
          </Label>
        </div>
      </div>

      <div className="flex flex-row gap-md">
        {/* Payment method options */}
        <div className="flex flex-col w-1/2">
          <Label>Method</Label>
          <Label className="font-semibold">
            {getValues("transaction.method") || "N/A"}
          </Label>
        </div>
        <div className="flex flex-col w-1/2">
          <Label>Status</Label>
          <AnimatedSelect
            items={Object.values(TransactionStatusKeys).map((key) => ({
              value: key as TransactionStatus,
              label: key as string,
              render: () => <span>{key}</span>,
            }))}
            controlProps={{
              control,
              name: "transaction.status",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderTransactionForm;
