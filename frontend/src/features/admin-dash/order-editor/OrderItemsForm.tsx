import { useFormContext, useFieldArray } from "react-hook-form";
import { DynamicTable, Label } from "@components/ui";
import { toMajorUnit } from "shared/utils";
import type { Order } from "shared/types";

const OrderItemsForm: React.FC = () => {
  const { control, watch } = useFormContext<Order>();
  const {
    fields: items,
    // append,
    //remove,
    //update,
  } = useFieldArray({
    control,
    name: "items",
  });

  const shippingCost = watch("shippingCost");
  const tax = watch("tax");
  const total = watch("total");
  const subTotal = total! - (shippingCost ?? 0) - (tax ?? 0);

  return (
    <div className="flex flex-col">
      <DynamicTable<{
        id?: string;
        image?: string;
        product: string;
        quantity: number;
        price: number;
      }>
        data={items.map((item) => ({
          id: item.id,
          image: item.product.images?.[0]?.thumbnail,
          product: item.product.name,
          quantity: item.quantity,
          price: item.price,
        }))}
        columns={[
          {
            id: "product",
            label: "Product",
            width: "200px",
            render: (i) => (
              <Label className="w-full overflow-hidden text-ellipsis whitespace-nowrap">
                {i.product}
              </Label>
            ),
          },
          {
            id: "quantity",
            label: "Qty.",
            width: "20px",
            render: (i) => <Label>{i.quantity}</Label>,
          },
          {
            id: "price",
            label: "Price",
            width: "60px",
            render: (i) => <Label>{toMajorUnit(i.price).toFixed(2)}</Label>,
          },
        ]}
      />

      <div className="flex flex-col border-b pb-md space-y-1 p-md self-center w-full">
        <div className="flex justify-between">
          <span className="text-md">Subtotal:</span>
          <span className="text-md">${((subTotal ?? 0) / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-md">Shipping:</span>
          <span className="text-md">
            ${((shippingCost ?? 0) / 100).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-md">Tax:</span>
          <span className="text-md">${((tax ?? 0) / 100).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span className="text-md">Order Total:</span>
          <span className="text-md">${((total ?? 0) / 100).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderItemsForm;
