import { useFormContext, useFieldArray } from "react-hook-form";
import { DynamicTable, Label } from "@components/ui";
import { toMajorPriceString } from "@shared/utils";
import type { Order } from "@shared/types";

const OrderItemsForm: React.FC = () => {
  const { control } = useFormContext<Order>();
  const {
    fields: items,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    name: "items",
  });

  return (
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
          width: "100px",
          render: (i) => <Label>{i.product}</Label>,
        },
        {
          id: "quantity",
          label: "Qty.",
          width: "100px",
          render: (i) => <Label>{i.quantity}</Label>,
        },
        {
          id: "price",
          label: "Price",
          width: "100px",
          render: (i) => <Label>{i.price}</Label>,
        },
      ]}
    />
    // <div className="flex flex-col gap-2">
    //   <Label>Order Items:</Label>
    //   {fields.map((item, idx) => (
    //     <div key={item.id || idx} className="flex gap-2 items-center">
    //       <Input
    //         type="text"
    //         placeholder="Product"
    //         {...register(`items.${idx}.product`)}
    //       />
    //       <Input
    //         type="number"
    //         {...register(`items.${idx}.quantity`, { valueAsNumber: true })}
    //         className="border rounded px-2 py-1 w-16 text-center"
    //       />
    //       <NumberInput
    //         variant="currency"
    //         className="border rounded px-2 py-1 w-24"
    //         controlProps={{
    //           control,
    //           name: `items.${idx}.price`,
    //           rules: { valueAsNumber: true },
    //         }}
    //       />
    //       <XButton onClick={() => remove(idx)} />
    //     </div>
    //   ))}
    //   <Button
    //     type="button"
    //     onClick={() => append({ product: "", quantity: 1, price: 0 })}
    //   >
    //     Add Item
    //   </Button>
    // </div>
  );
};

export default OrderItemsForm;
