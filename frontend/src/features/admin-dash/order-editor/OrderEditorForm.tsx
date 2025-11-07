import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button, AnimatedDropdownBox } from "@components/ui";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { OrderSchema, OrderFormType } from "./OrderSchema";

import type { SafeType, Order } from "shared/types";

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

  // action buttons function
  const renderActionButtons = () => {
    return (
      <div className="flex flex-row lg:flex-col bg-surface h-14 border-t gap-sm p-sm items-center sticky bottom-0 z-10">
        <div className="hidden w-1/2" />
        {methods.watch("id") && (
          <Button
            className="h-full w-1/3 lg:w-full"
            variant="destructive"
            type="button"
            onClick={handleDelete}
          >
            Delete Order
          </Button>
        )}
        <Button
          className="h-full w-1/3 lg:w-full"
          variant="flat"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button className="h-full w-1/3 lg:w-full" type="submit">
          {methods.watch("id") ? "Save Changes" : "Create Order"}
        </Button>
      </div>
    );
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col lg:flex-row h-full min-h-0 relative"
        onSubmit={handleSave}
      >
        <div className="hidden lg:flex flex-col gap-md items-middle lg:w-[250px] py-md border-r">
          <OrderInfoForm />
          {renderActionButtons()}
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto gap-sm p-sm sm:p-md sm:gap-md lg:flex-row">
          <div className="flex flex-col gap-sm sm:gap-md lg:w-1/2">
            {/* Order Info */}
            <AnimatedDropdownBox
              className="lg:hidden"
              title="Order Info"
              openInitially={true}
            >
              <OrderInfoForm />
            </AnimatedDropdownBox>

            {/* Status History */}
            <AnimatedDropdownBox
              contentClassName="!p-0"
              title="Order Status History"
              openInitially={true}
            >
              <OrderStatusHistoryForm />
            </AnimatedDropdownBox>

            {/* Order Items */}
            <AnimatedDropdownBox
              contentClassName="!p-0"
              title="Order Items"
              openInitially={true}
            >
              <OrderItemsForm />
            </AnimatedDropdownBox>

            {/* Transaction Info */}
            <AnimatedDropdownBox title="Transaction" openInitially={true}>
              <OrderTransactionForm />
            </AnimatedDropdownBox>
          </div>
          <div className="flex flex-col gap-sm sm:gap-md lg:w-1/2">
            {/* Shipping Info */}
            <AnimatedDropdownBox title="Shipping Info" openInitially={true}>
              <OrderShippingForm />
            </AnimatedDropdownBox>

            {/* Notes */}
            <AnimatedDropdownBox title="Notes" openInitially={true}>
              <OrderNotesForm />
            </AnimatedDropdownBox>
          </div>
        </div>
        <div className="lg:hidden">{renderActionButtons()}</div>
      </form>
    </FormProvider>
  );
};

export default OrderEditorForm;
