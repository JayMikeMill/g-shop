import { useFormContext } from "react-hook-form";
import type { Product } from "shared/types";
import DimensionsForm from "./DimensionsForm";

// Legacy export for existing usage
const ProductDimensionsForm: React.FC = () => {
  const { control } = useFormContext<Product>();

  return (
    <div className="flex flex-col gap-md">
      <div className="flex flex-col">
        <label>Full Dimensions</label>
        <DimensionsForm
          controlProps={{
            control,
            rootName: "dimensions",
          }}
        />
      </div>
      <div className="flex flex-col">
        <label>Shipping Dimensions</label>
        <DimensionsForm
          controlProps={{
            control,
            rootName: "shipDimensions",
          }}
        />
      </div>
    </div>
  );
};

export default ProductDimensionsForm;
