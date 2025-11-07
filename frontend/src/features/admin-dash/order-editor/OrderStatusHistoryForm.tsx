import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { DynamicTable, Label, AnimatedSelect, Button } from "@components/ui";
import { OrderStatusKeys, type Order, type OrderStatus } from "shared/types";
import { formatMMDDYYYY } from "shared/utils";

const OrderStatusHistoryForm: React.FC = () => {
  const { control, setValue, getValues } = useFormContext<Order>();
  const [status, setStatus] = React.useState<OrderStatus>(getValues("status"));
  const { fields: items, append: addStatus } = useFieldArray({
    control,
    name: "statusHistory",
  });

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center p-sm w-full gap-sm">
        <AnimatedSelect
          className="w-full"
          menuClassName="text-center"
          items={Object.values(OrderStatusKeys).map((key) => ({
            value: key as OrderStatus,
            label: key as string,
            render: () => <span>{key}</span>,
          }))}
          value={status}
          onChange={(val) => setStatus(val as OrderStatus)}
        />
        {/* Add Status Button */}
        <Button
          onClick={() => {
            if (status) {
              addStatus({ status, timestamp: new Date() });
              setValue("status", status);
            }
          }}
        >
          Update Status
        </Button>
      </div>

      <DynamicTable<{
        id?: string;
        status: string;
        timestamp: string;
      }>
        className="rounded-none"
        data={[...items].reverse().map((item) => ({
          status: item.status,
          timestamp: formatMMDDYYYY(item.timestamp!),
        }))}
        minWidth="100%"
        rowHeight="40px"
        columns={[
          {
            id: "status",
            label: "Status",
            width: "35%",
            render: (i) => (
              <Label className="block font-bold text-lg w-full px-sm overflow-hidden text-ellipsis whitespace-nowrap">
                {i.status}
              </Label>
            ),
          },
          {
            id: "timestamp",
            label: "Timestamp",
            width: "65%",
            render: (i) => (
              <Label className="block font-bold text-lg w-full px-sm overflow-hidden text-ellipsis whitespace-nowrap">
                {i.timestamp}
              </Label>
            ),
          },
        ]}
      />
    </div>
  );
};

export default OrderStatusHistoryForm;
