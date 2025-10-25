import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@components/ui";
import { Input } from "@components/ui";
import type { CrudEditorInterface } from "../CrudEditorInterface";
import type { User } from "shared/types/PrismaTypes";
import type { SafeType } from "shared/types";

const defaultUser: User = {
  email: "",
  passwordHash: "",
  firstName: "",
  lastName: "",
  phone: "",
  role: "USER",
  isVerified: false,
  failedLoginAttempts: 0,
};

export const UserEditorForm: React.FC<CrudEditorInterface<User>> = ({
  item,
  onCreate,
  onModify,
  onDelete,
  onCancel,
}) => {
  const isNew = !item?.id;
  const methods = useForm<SafeType<User>>({
    defaultValues: item ?? defaultUser,
    mode: "onChange",
  });
  const { handleSubmit, reset } = methods;

  React.useEffect(() => {
    reset(item ?? defaultUser);
  }, [item, reset]);

  const onSubmit = (data: User) => {
    // Convert isVerified from string to boolean
    const fixedData = {
      ...data,
      isVerified: String(data.isVerified) === "true",
      id: item?.id ?? data.id ?? "",
    };
    if (isNew) onCreate(fixedData);
    else onModify(fixedData as User & { id: string });
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col h-full min-h-0"
        onSubmit={handleSubmit(onSubmit)}
        style={{ minWidth: 320 }}
      >
        <div className="flex-1 min-h-0 overflow-y-auto px-md py-md">
          <label>Email</label>
          <Input {...methods.register("email", { required: true })} />
          <label>First Name</label>
          <Input {...methods.register("firstName", { required: true })} />
          <label>Last Name</label>
          <Input {...methods.register("lastName", { required: true })} />
          <label>Phone</label>
          <Input {...methods.register("phone")} />
          <label>Role</label>
          <select {...methods.register("role", { required: true })}>
            <option value="USER">User</option>
            <option value="STAFF">Staff</option>
            <option value="ADMIN">Admin</option>
          </select>
          <label>Verified</label>
          <select {...methods.register("isVerified", { required: true })}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label>Failed Login Attempts</label>
          <Input
            type="number"
            {...methods.register("failedLoginAttempts", {
              valueAsNumber: true,
            })}
          />
        </div>
        <div className="sticky bottom-0 z-10 bg-surface py-md flex gap-2 px-md justify-center border-t">
          {!isNew && (
            <Button
              className="flex flex-1"
              variant="destructive"
              type="button"
              onClick={() => item?.id && onDelete(item.id)}
            >
              Delete
            </Button>
          )}
          <Button
            className="flex flex-1"
            variant="flat"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button className="flex flex-1" type="submit" variant="default">
            {isNew ? "Create User" : "Save Changes"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
