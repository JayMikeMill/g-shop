// src/components/CatalogDialog.tsx
import type { CrudEditorInterface } from "../CrudEditorInterface";
import { type Collection, type Category } from "shared/types";
import { AnimatedDialog } from "@components/ui";
import CollectionEditorForm from "./CollectionEditorForm";

interface CollectionDialogProps<T extends Collection>
  extends CrudEditorInterface<T> {
  typeLabel: "Category" | "Collection";
}

function CollectionDialogBase<T extends Collection>({
  open,
  item,
  onCreate,
  onModify,
  onDelete,
  onCancel,
  typeLabel,
}: CollectionDialogProps<T>) {
  const isAdding = !item || !item.id;

  return (
    <AnimatedDialog
      title={isAdding ? `Add ${typeLabel}` : `Edit ${typeLabel}`}
      open={!!open}
      onClose={onCancel}
      className="flex flex-col overflow-hidden rounded-none pl-2 w-full h-full 
      sm:rounded-2xl sm:max-w-3xl px-md sm:px-lg"
    >
      <CollectionEditorForm
        item={item as Collection | undefined}
        isAdding={isAdding}
        onCreate={onCreate as (item: Collection) => void}
        onModify={onModify as (item: Collection) => void}
        onDelete={onDelete as (id: string) => void}
        onCancel={onCancel}
        typeLabel={typeLabel}
      />
    </AnimatedDialog>
  );
}

// Convenience wrappers
const CollectionDialog = (props: CrudEditorInterface<Collection>) => (
  <CollectionDialogBase {...props} typeLabel="Collection" />
);

const CategoryDialog = (props: CrudEditorInterface<Category>) => (
  <CollectionDialogBase {...props} typeLabel="Category" />
);

export { CategoryDialog, CollectionDialog };
