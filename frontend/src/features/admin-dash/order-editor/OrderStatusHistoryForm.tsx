import { useFormContext, useFieldArray } from "react-hook-form";
import {
  AnimatedSelect,
  Button,
  DateTimeInput,
  Input,
  Label,
  XButton,
} from "@components/ui";
import { OrderStatusKeys, type Order, type OrderStatus } from "@shared/types";

const OrderStatusHistoryForm: React.FC = () => {
  const { control } = useFormContext<Order>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "statusHistory",
  });

  console.log({ fields });

  return (
    <div className="flex flex-col gap-sm">
      <div className="flex flex-col">
        <div className="flex flex-row gap-sm sm:gap-md w-full">
          <Label className="font-semibold flex-none w-32 text-center">
            Status
          </Label>
          <Label className="font-semibold w-full text-center pr-8">
            Timestamp
          </Label>
        </div>
        {fields.map((h, idx) => (
          <div
            key={h.id || idx}
            className="flex flex-row gap-sm sm:gap-md w-full"
          >
            <AnimatedSelect
              className="flex-none w-32"
              items={Object.values(OrderStatusKeys).map((key) => ({
                value: key as OrderStatus,
                label: key as string,
                render: () => <span>{key}</span>,
              }))}
              controlProps={{
                control,
                name: `statusHistory.${idx}.status`,
              }}
            />

            <DateTimeInput
              controlProps={{
                control,
                name: `statusHistory.${idx}.timestamp`,
              }}
            />

            <XButton onClick={() => remove(idx)} />
          </div>
        ))}
      </div>
      <Button
        type="button"
        className="w-60 self-center"
        onClick={() => append({ status: "PENDING", timestamp: new Date() })}
      >
        Add Status
      </Button>
    </div>
  );
};

export default OrderStatusHistoryForm;
