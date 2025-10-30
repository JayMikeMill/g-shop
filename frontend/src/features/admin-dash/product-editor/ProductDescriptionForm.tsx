import React from "react";
import { useFormContext } from "react-hook-form";
import { Button, Input, Label, Textarea } from "@components/ui";
import { useApi } from "@app/hooks";
import type { Product } from "shared/types";

export const ProductDescriptionForm: React.FC = () => {
  const [generatingDescription, setGeneratingDescription] =
    React.useState(false);

  const { register, getValues, setValue, watch } = useFormContext<Product>();
  const { generateProductDescription } = useApi().ai;

  // Materials and Features
  const materials = watch("materials");
  const features = watch("features");

  const handleCommaInput = (name: "materials" | "features", value: string) => {
    const array = value
      .split(",")
      .map((v) => v.trim()) // remove spaces around each item
      .filter((v) => v.length > 0); // remove empty strings
    setValue(name, array);
  };

  const handleGenerateDescription = async () => {
    console.log("Generating description...");
    setGeneratingDescription(true);
    const productData: Product = getValues();
    const response = await generateProductDescription(productData);
    console.log("Generated description:", response);
    if (response.success && response.data) {
      setValue("description", response.data);
    }
    setGeneratingDescription(false);
  };

  return (
    <div className="flex flex-col gap-md">
      {/* Materials */}
      <div className="flex flex-col">
        <label>Materials</label>
        <Input
          type="text"
          defaultValue={(materials || []).join(", ")}
          onChange={(e) => handleCommaInput("materials", e.target.value)}
          placeholder="Cotton, Stainless Steel, Plastic"
        />
      </div>

      {/* Features */}
      <div className="flex flex-col">
        <label>Features</label>
        <Input
          type="text"
          defaultValue={(features || []).join(", ")}
          onChange={(e) => handleCommaInput("features", e.target.value)}
          placeholder="Waterproof, Lightweight"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col">
        <Label>Details</Label>
        <Input placeholder="Product Details" {...register("details")} />
      </div>

      {/* Generate Description Button */}
      <Button
        loadingIcon={generatingDescription}
        className="w-full"
        type="button"
        onClick={handleGenerateDescription}
      >
        {generatingDescription
          ? "Generating Description..."
          : "Generate Description With ChatGPT"}
      </Button>

      {/* Description */}
      <div className="flex flex-col">
        <Label>Description</Label>
        <Textarea
          {...register("description")}
          placeholder="Product Description"
          required
          className="px-md py-1 h-72 resize-none"
        />
      </div>
    </div>
  );
};

export default ProductDescriptionForm;
