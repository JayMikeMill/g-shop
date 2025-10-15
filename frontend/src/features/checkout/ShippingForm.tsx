import { useFormContext } from "react-hook-form";
import AddressForm from "@components/ui/custom/AddressForm";
import type { CheckoutFormType } from "./CheckoutSchema";

export default function ShippingForm({ className }: { className?: string }) {
  const formContext = useFormContext<CheckoutFormType>();

  return (
    <div className={className}>
      <AddressForm formContext={formContext} rootName="shippingInfo.address" />
    </div>
  );
}
