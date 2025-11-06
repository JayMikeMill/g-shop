import { useFormContext } from "react-hook-form";
import { AnimatedSelect, Label } from "@components/ui";
import { OrderStatusKeys, type OrderStatus } from "shared/types";

const OrderInfoForm: React.FC = () => {
  const { control, watch } = useFormContext();
  const orderId = watch("id");
  const userId = watch("userId");

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-md pb-md">
        <div className="flex flex-col border-b pb-md">
          <Label className="w-full text-center  text-lg">Order ID</Label>
          <Label className="text-lg text-center font-semibold whitespace-normal ">
            {orderId ?? "No order ID"}
          </Label>
        </div>
        <div className="flex flex-col border-b pb-md">
          <Label className="w-full text-center  text-lg">User ID</Label>
          <Label className="text-lg text-center font-semibold whitespace-normal">
            {userId ?? "No user ID"}
          </Label>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <Label> Order Status</Label>
        <AnimatedSelect
          className="w-40"
          menuClassName="text-center"
          items={Object.values(OrderStatusKeys).map((key) => ({
            value: key as OrderStatus,
            label: key as string,
            render: () => <span>{key}</span>,
          }))}
          controlProps={{
            control,
            name: "status",
          }}
        />
      </div>
    </div>
  );
};

export default OrderInfoForm;
