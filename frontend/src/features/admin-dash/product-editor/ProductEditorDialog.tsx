import type { Product } from "@shared/types";

import type { CrudEditorInterface } from "../CrudEditorInterface";
import { ProductEditorForm } from "./ProductEditorForm";
import { AnimatedDialog } from "@components/ui";

function ProductEditorDialog({
  open,
  item,
  onCreate,
  onModify,
  onDelete,
  onCancel,
}: CrudEditorInterface<Product>) {
  return (
    <AnimatedDialog
      open={!!open}
      onClose={onCancel}
      title={item?.id ? "Edit Product" : "Create Product"}
      className={`flex flex-col overflow-hidden pl-2 w-full h-full rounded-none 
        sm:rounded-2xl sm:max-w-3xl px-md sm:px-lg`}
    >
      <ProductEditorForm
        item={item}
        onCreate={onCreate}
        onModify={onModify}
        onDelete={onDelete}
        onCancel={onCancel}
      />
    </AnimatedDialog>
  );
}

export { ProductEditorDialog };
