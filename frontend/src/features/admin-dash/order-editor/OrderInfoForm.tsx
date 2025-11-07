import { Label } from "@components/ui";
import { useFormContext } from "react-hook-form";

const OrderInfoForm: React.FC = () => {
  const { watch } = useFormContext();
  const orderId = watch("id");
  const userId = watch("userId");
  const status = watch("status");

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
        <Label className="text-xl font-bold mt-sm">
          {status ?? "No status"}
        </Label>
      </div>
    </div>
  );
};

export default OrderInfoForm;
