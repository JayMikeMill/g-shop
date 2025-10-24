import { useFormContext } from "react-hook-form";
import AddressForm from "@components/ui/custom/AddressForm";
import { Input, Label } from "@components/ui";
import { type Order } from "shared/types";

const OrderShippingForm: React.FC = () => {
  const formContext = useFormContext<Order>();
  const { register, getValues } = formContext;

  return (
    <div className="flex flex-col gap-2">
      <AddressForm formContext={formContext} rootName="shippingInfo.address" />

      {/* Shipping carrier options */}
      <Label>Carrier: {getValues("shippingInfo.carrier")}</Label>

      {/* Shipping method options */}
      <Label>Method: {getValues("shippingInfo.method")}</Label>

      {/* Tracking number and cost */}
      <div className="flex flex-col">
        <Label>Tracking Number:</Label>
        <Label className="font-semibold">
          {getValues("shippingInfo.tracking") || "No tracking number"}
        </Label>
      </div>

      <div className="flex flex-col">
        <Label>Shipping Cost:</Label>
        <Input
          type="number"
          placeholder="Cost"
          {...register("shippingInfo.cost", { valueAsNumber: true })}
          className="border rounded px-2 py-1 w-full"
        />
      </div>
    </div>
  );
};

export default OrderShippingForm;
