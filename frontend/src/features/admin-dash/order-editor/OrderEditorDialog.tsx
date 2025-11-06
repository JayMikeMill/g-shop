import React from "react";
import { AnimatedDialog } from "@components/ui";
import type { CrudEditorInterface } from "@features/admin-dash";
import { type Order } from "shared/types";
import OrderEditorForm from "./OrderEditorForm";

// --- Main Dialog ---
export const OrderEditorDialog: React.FC<CrudEditorInterface<Order>> = ({
  open,
  item,
  onCreate,
  onModify,
  onDelete,
  onCancel,
}) => (
  <AnimatedDialog
    open={!!open}
    onClose={onCancel}
    title={item?.id ? "Edit Order" : "Create Order"}
    className={`flex flex-col overflow-hidden w-full h-full 
      rounded-none sm:rounded-2xl sm:max-w-[90%] sm:px-lg sm:max-h-[95%]`}
  >
    <OrderEditorForm
      item={item}
      onCreate={onCreate}
      onModify={onModify}
      onDelete={onDelete}
      onCancel={onCancel}
    />
  </AnimatedDialog>
);
