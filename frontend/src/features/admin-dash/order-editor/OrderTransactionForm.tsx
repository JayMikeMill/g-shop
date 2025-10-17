import { useFormContext } from "react-hook-form";

import { Label, AnimatedSelect, Input, NumberInput } from "@components/ui";

import {
  PaymentMethodKeys,
  TransactionStatusKeys,
  type Order,
  type PaymentMethod,
  type TransactionStatus,
} from "shared/types";

const OrderTransactionForm: React.FC = () => {
  const { register, control } = useFormContext<Order>();

  return (
    <div className="flex flex-col gap-md justify-left">
      <div className="flex flex-row gap-md">
        <div className="w-1/2">
          <Label>Amount</Label>
          <NumberInput
            className="w-full"
            variant="currency"
            placeholder="Amount"
            controlProps={{
              control,
              name: "transaction.amount",
              rules: { valueAsNumber: true },
            }}
          />
        </div>
        <div className="w-1/2">
          <Label>Currency</Label>
          <Input
            {...register("transaction.currency")}
            type="text"
            placeholder="Currency"
          />
        </div>
      </div>

      <div className="flex flex-row gap-md">
        {/* Payment method options */}
        <div className="w-1/2">
          <Label>Method</Label>
          <AnimatedSelect
            items={Object.values(PaymentMethodKeys).map((key) => ({
              value: key as PaymentMethod,
              label: key as string,
              render: () => <span>{key}</span>,
            }))}
            controlProps={{
              control,
              name: "transaction.method",
            }}
          />
        </div>
        <div className="w-1/2">
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
