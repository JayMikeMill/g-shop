import AddressForm from "@components/ui/custom/AddressForm";
import type { ShippingInfo } from "@shared/types";

export default function ShippingForm({
  className,
  shippingInfo,
  setShippingInfo,
}: {
  className?: string;
  shippingInfo: ShippingInfo;
  setShippingInfo: (info: ShippingInfo) => void;
}) {
  // Form implementation here
  return (
    <div className={className}>
      <AddressForm
        address={shippingInfo.address ?? undefined}
        setAddress={(address) => setShippingInfo({ ...shippingInfo, address })}
      />
    </div>
  );
}
