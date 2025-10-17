import React from "react";
import { useFormContext } from "react-hook-form";
import AddressForm from "@components/ui/custom/AddressForm";

const AdminSettingsShippingOriginForm: React.FC = () => {
  const formContext = useFormContext();

  return (
    <div className="flex flex-col gap-md">
      <AddressForm formContext={formContext} rootName="shippingOrigin" />
    </div>
  );
};

export default AdminSettingsShippingOriginForm;
