import { useFormContext } from "react-hook-form";
import { AnimatedSelect, Label } from "@components/ui";
import { OrderStatusKeys, type OrderStatus } from "shared/types";

const OrderInfoForm: React.FC = () => {
  const { watch, control } = useFormContext();
  const orderId = watch("id");
  const userId = watch("userId");

  const shippingCost = watch("shippingCost");
  const tax = watch("tax");
  const total = watch("total");
  const subTotal = total! - (shippingCost ?? 0) - (tax ?? 0);

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

      <div className="flex flex-col border-b pb-md space-y-1 max-w-sm self-center w-full">
        <div className="flex justify-between">
          <span className="text-md">Subtotal:</span>
          <span className="text-md">${((subTotal ?? 0) / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-md">Shipping:</span>
          <span className="text-md">
            ${((shippingCost ?? 0) / 100).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-md">Tax:</span>
          <span className="text-md">${((tax ?? 0) / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span className="text-md">Order Total:</span>
          <span className="text-md">${((total ?? 0) / 100).toFixed(2)}</span>
        </div>

        <div className="h-px border-b  w-full" />
        <div className="flex flex-row items-center justify-between pt-md">
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
    </div>
  );
};

export default OrderInfoForm;
