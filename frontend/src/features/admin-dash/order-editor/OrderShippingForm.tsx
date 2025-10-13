import { useFormContext } from "react-hook-form";
import AddressForm from "@components/ui/custom/AddressForm";
import { Input } from "@components/ui";
import type { Order } from "@shared/types";

const OrderShippingForm: React.FC = () => {
  const formContext = useFormContext<Order>();
  const { register } = formContext;

  return (
    <div className="flex flex-col gap-2">
      <AddressForm
        formContext={formContext}
        rootName="shippingInfo.address"
        className="border rounded p-2"
      />
      <select
        {...register("shippingInfo.carrier")}
        className="border rounded px-2 py-1 w-full"
      >
        <option value="">Select Carrier</option>
        {/* Add carrier options here */}
      </select>
      <select
        {...register("shippingInfo.method")}
        className="border rounded px-2 py-1 w-full"
      >
        <option value="">Select Method</option>
        {/* Add method options here */}
      </select>
      <Input
        type="text"
        placeholder="Tracking #"
        {...register("shippingInfo.tracking")}
        className="border rounded px-2 py-1 w-full"
      />
      <Input
        type="number"
        placeholder="Cost (cents)"
        {...register("shippingInfo.cost", { valueAsNumber: true })}
        className="border rounded px-2 py-1 w-full"
      />
    </div>
  );
};

export default OrderShippingForm;
