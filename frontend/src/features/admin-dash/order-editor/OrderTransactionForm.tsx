import { useFormContext } from "react-hook-form";

import { Label, AnimatedSelect, Input, NumberInput } from "@components/ui";

import {
  PaymentMethodKeys,
  TransactionStatusKeys,
  type Order,
  type PaymentMethod,
  type TransactionStatus,
} from "@shared/types";

const OrderTransactionForm: React.FC = () => {
  const { register, control } = useFormContext<Order>();

  return (
    <div className="flex flex-col gap-md justify-left">
      <div className="flex flex-row gap-md">
        <Label className="w-1/2">
          Amount
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
        </Label>
        <Label className="w-1/2">
          Currency
          <Input
            {...register("transaction.currency")}
            type="text"
            placeholder="Currency"
          />
        </Label>
      </div>

      <div className="flex flex-row gap-md">
        {/* Payment method options */}
        <Label className="w-1/2">
          Method
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
        </Label>
        <Label className="w-1/2">
          Status
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
        </Label>
      </div>
    </div>
  );
};

export default OrderTransactionForm;
