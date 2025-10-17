import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, AnimatedDropdownBox } from "@components/ui";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { OrderSchema, OrderFormType } from "./OrderSchema";

import type { SafeType, Order } from "@shared/types";

import OrderInfoForm from "./OrderInfoForm";
import OrderItemsForm from "./OrderItemsForm";
import OrderShippingForm from "./OrderShippingForm";
import OrderTransactionForm from "./OrderTransactionForm";
import OrderStatusHistoryForm from "./OrderStatusHistoryForm";
import OrderNotesForm from "./OrderNotesForm";

export const newOrder: SafeType<Order> = {
  status: "PENDING",
  total: 0,
};

interface Props {
  item: Order | null;
  onCreate: (order: Order) => void;
  onModify: (order: Order & { id: string }) => void;
  onDelete: (id: string) => void;
  onCancel: () => void;
}

const OrderEditorForm: React.FC<Props> = ({
  item,
  onCreate,
  onModify,
  onDelete,
  onCancel,
}) => {
  const methods = useForm<SafeType<Order>>({
    //resolver: zodResolver(Order),
    defaultValues: item ?? newOrder,
    mode: "onChange",
  });

  useEffect(() => {
    methods.reset(item ?? newOrder);
  }, [item]);

  const handleCancel = () => onCancel();
  const handleDelete = () => {
    const id = methods.getValues("id");
    if (!id) return;
    if (window.confirm(`Are you sure you want to delete order ${id}?`))
      onDelete(id);
  };
  const handleSave = methods.handleSubmit((data) => {
    if (data.id) onModify(data as Order & { id: string });
    else onCreate(data);
  });

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col flex-1 overflow-y-auto gap-sm sm:gap-md relative"
        onSubmit={handleSave}
      >
        <div className="flex flex-col gap-sm p-sm sm:p-md sm:gap-md">
          <AnimatedDropdownBox title="Order Info" openInitially={true}>
            <OrderInfoForm />
          </AnimatedDropdownBox>
          <AnimatedDropdownBox
            className="p-0"
            title="Items"
            openInitially={true}
          >
            <OrderItemsForm />
          </AnimatedDropdownBox>
          <AnimatedDropdownBox title="Shipping Info" openInitially={true}>
            <OrderShippingForm />
          </AnimatedDropdownBox>
          <AnimatedDropdownBox title="Transaction" openInitially={true}>
            <OrderTransactionForm />
          </AnimatedDropdownBox>
          <AnimatedDropdownBox title="Status History" openInitially={true}>
            <OrderStatusHistoryForm />
          </AnimatedDropdownBox>
          <AnimatedDropdownBox title="Notes" openInitially={true}>
            <OrderNotesForm />
          </AnimatedDropdownBox>
        </div>
        {/* Action buttons */}
        <div className="sticky bottom-0 bg-card py-md flex gap-2 px-md justify-center border-t">
          {methods.watch("id") && (
            <Button
              className="flex flex-1"
              variant="destructive"
              type="button"
              onClick={handleDelete}
            >
              Delete Order
            </Button>
          )}
          <Button className="flex flex-1" variant="flat" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="flex flex-1" type="submit">
            {methods.watch("id") ? "Save Changes" : "Create Order"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default OrderEditorForm;
