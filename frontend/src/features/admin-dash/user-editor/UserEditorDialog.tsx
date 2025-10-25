import React from "react";
import { UserEditorForm } from "./UserEditorForm";
import { AnimatedDialog, Button } from "@components/ui";
import type { CrudEditorInterface } from "@features/admin-dash";
import type { User } from "shared/types/PrismaTypes";

// --- Main Dialog ---
export const UserEditorDialog: React.FC<CrudEditorInterface<User>> = ({
  open,
  item,
  //onCreate,
  //onModify,
  onCreate,
  onModify,
  onDelete,
  onCancel,
}) => (
  <AnimatedDialog
    open={!!open}
    onClose={onCancel}
    title={item?.id ? "Edit User" : "Create User"}
    className={`flex flex-col overflow-hidden w-full h-full 
      rounded-none sm:rounded-2xl sm:max-w-2xl sm:px-lg`}
  >
    <UserEditorForm
      item={item}
      onCreate={onCreate}
      onModify={onModify}
      onDelete={onDelete}
      onCancel={onCancel}
    />
  </AnimatedDialog>
);
