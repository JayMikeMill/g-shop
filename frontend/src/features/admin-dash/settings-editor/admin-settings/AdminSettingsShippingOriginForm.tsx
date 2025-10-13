import React from "react";
import { useFormContext } from "react-hook-form";
import AddressForm from "@components/ui/custom/AddressForm";

const AdminSettingsShippingOriginForm: React.FC = () => {
  const { register, setValue, watch } = useFormContext();
  const address = watch("shippingOrigin");

  return (
    <div className="flex flex-col gap-md">
      <AddressForm
        address={address}
        setAddress={(address) =>
          setValue("shippingOrigin", address, { shouldDirty: true })
        }
      />
    </div>
  );
};

export default AdminSettingsShippingOriginForm;
