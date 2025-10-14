import { useFormContext } from "react-hook-form";
import { AnimatedSelect, Label } from "@components/ui";
import { OrderStatusKeys, type OrderStatus } from "@shared/types";

const OrderInfoForm: React.FC = () => {
  const { register, watch, control } = useFormContext();
  const orderId = watch("id");
  const userId = watch("userId");
  const total = watch("total");

  return (
    <div className="flex flex-col gap-md">
      <Label className="w-full text-center">
        Order ID:
        <Label className="text-lg">{orderId ?? "No order ID"}</Label>
      </Label>
      <Label className="w-full text-center">
        User ID:
        <Label className="text-lg">{userId ?? "No user ID"}</Label>
      </Label>

      <Label>
        Status
        <AnimatedSelect
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
      </Label>

      <div>
        <Label className="text-md">
          Order Total:
          <Label className="text-xl">${(total ?? 0) / 100}</Label>
        </Label>
      </div>
    </div>
  );
};

export default OrderInfoForm;
