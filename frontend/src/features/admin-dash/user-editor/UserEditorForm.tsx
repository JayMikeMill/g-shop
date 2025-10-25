import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { AnimatedSelect, Button } from "@components/ui";
import { Input } from "@components/ui";
import type { CrudEditorInterface } from "../CrudEditorInterface";
import { UserRoleKeys, type User } from "shared/types/PrismaTypes";
import type { SafeType, UserRole } from "shared/types";
import { useUser } from "@app/hooks";
const defaultUser: User = {
  email: "",
  passwordHash: "",
  firstName: "",
  lastName: "",
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
  const [password, setPassword] = React.useState("");

  const { register } = useUser();

  const isNew = !item?.id || item.id === "";
  const methods = useForm<SafeType<User>>({
    defaultValues: isNew ? defaultUser : (item ?? defaultUser),
    mode: "onChange",
  });
  const { handleSubmit, reset, control, getValues } = methods;

  console.log("UserEditorForm item:", isNew, getValues());

  React.useEffect(() => {
    reset(item ?? defaultUser);
  }, [item, reset]);

  const onSubmit = (data: User) => {
    if (isNew) register(data, password);
    else onModify(data as User & { id: string });
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col h-full min-h-0"
        onSubmit={handleSubmit(onSubmit)}
        style={{ minWidth: 320 }}
        autoComplete="new-password"
      >
        <div className="flex-1 min-h-0  p-md">
          <div className="flex flex-col gap-md">
            <div className="flex flex-row gap-md">
              <div className="flex flex-col w-full">
                <label>First Name</label>
                <Input {...methods.register("firstName", { required: true })} />
              </div>
              <div className="flex flex-col w-full">
                <label>Last Name</label>
                <Input {...methods.register("lastName", { required: true })} />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label>Email</label>
              <Input {...methods.register("email", { required: true })} />
            </div>
            <div className="flex flex-col w-full">
              <label>Phone</label>
              <Input {...methods.register("phone")} />
            </div>
            <div className="flex flex-row gap-md">
              <div className="flex flex-col w-full">
                <label>Role</label>
                <AnimatedSelect<UserRole>
                  items={Object.values(UserRoleKeys).map((role) => ({
                    value: role,
                    label: role,
                    render: (item) => <span>{item}</span>,
                  }))}
                  controlProps={{ control, name: "role" }}
                />
              </div>
              <div className="flex flex-col w-full">
                <label>Verified</label>
                <AnimatedSelect<Boolean>
                  items={[
                    { value: true, label: "YES" },
                    { value: false, label: "NO" },
                  ]}
                  controlProps={{ control, name: "isVerified" }}
                />
              </div>
            </div>
            {isNew && (
              <div className="flex flex-col w-full">
                <label>Password</label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row bg-surface border-t gap-2 px-0 py-md items-center sticky bottom-0 z-10">
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
