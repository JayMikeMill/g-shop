import { useFormContext } from "react-hook-form";
import { Label } from "@components/ui";

const OrderInfoForm: React.FC = () => {
  const { register, watch } = useFormContext();
  const orderId = watch("id");
  const userId = watch("userId");
  const status = watch("status");
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
        Status:
        <select
          {...register("status")}
          className="border rounded px-2 py-1 mt-1 w-full"
        >
          {["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
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
