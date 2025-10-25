import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Label, AnimatedSelect } from "@components/ui";
import { type UserRole, UserRoleKeys } from "shared/types";

export type RegistrationFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: UserRole;
};

interface RegistrationFormProps {
  onSubmit: (data: RegistrationFormInputs) => Promise<void>;
  loading?: boolean;
  showRoleSelect?: boolean;
  defaultRole?: UserRole;
  submitButtonText?: string;
  title?: string;
  autoComplete?: boolean;
  className?: string;
}

export const UserRegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  loading = false,
  showRoleSelect = false,
  defaultRole = "USER",
  submitButtonText = "Create Account",
  title,
  autoComplete = false,
  className = "",
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<RegistrationFormInputs>({
    defaultValues: {
      role: defaultRole,
    },
  });

  const handleFormSubmit = async (
    data: RegistrationFormInputs,
    e?: React.BaseSyntheticEvent
  ) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }

    try {
      await onSubmit(data);
    } catch (error: any) {
      setError("root", { message: error.message || "Registration failed" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`flex flex-col gap-md w-full ${className}`}
      autoComplete={autoComplete ? "on" : "off"}
    >
      {title && (
        <h1 className="text-4xl font-bold text-center mb-lg">{title}</h1>
      )}

      {/* First Name and Last Name */}
      <div className="flex flex-row gap-md">
        <div className="flex flex-col font-semibold flex-1">
          <Label>First Name</Label>
          <Input
            {...register("firstName", { required: "First name is required" })}
            type="text"
            autoComplete={autoComplete ? "given-name" : "new-password"}
            disabled={loading}
          />
          {errors.firstName && (
            <span className="text-destructive text-sm">
              {errors.firstName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col font-semibold flex-1">
          <Label>Last Name</Label>
          <Input
            {...register("lastName", { required: "Last name is required" })}
            type="text"
            autoComplete={autoComplete ? "family-name" : "new-password"}
            disabled={loading}
          />
          {errors.lastName && (
            <span className="text-destructive text-sm">
              {errors.lastName.message}
            </span>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col font-semibold">
        <Label>Email</Label>
        <Input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Please enter a valid email address",
            },
          })}
          type="email"
          autoComplete={autoComplete ? "email" : "new-password"}
          disabled={loading}
        />
        {errors.email && (
          <span className="text-destructive text-sm">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Role Selection */}
      {showRoleSelect && (
        <div className="flex flex-col">
          <Label>Role</Label>
          <AnimatedSelect<UserRole>
            items={Object.values(UserRoleKeys).map((role) => ({
              value: role,
              label: role,
              render: (item) => <span>{item}</span>,
            }))}
            controlProps={{ control, name: "role" }}
          />
          {errors.role && (
            <span className="text-destructive text-sm">
              {errors.role.message}
            </span>
          )}
        </div>
      )}

      {/* Password */}
      <div className="flex flex-col font-semibold">
        <Label>Password</Label>
        <Input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          type="password"
          autoComplete="new-password"
          disabled={loading}
        />
        {errors.password && (
          <span className="text-destructive text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col font-semibold">
        <Label>Confirm Password</Label>
        <Input
          {...register("confirmPassword", {
            required: "Please confirm your password",
          })}
          type="password"
          autoComplete="new-password"
          disabled={loading}
        />
        {errors.confirmPassword && (
          <span className="text-destructive text-sm">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      {/* Global Error */}
      {errors.root && (
        <div className="text-destructive text-sm bg-destructive/10 p-2 rounded">
          {errors.root.message}
        </div>
      )}

      {/* Submit */}
      <Button type="submit" className="mt-md" disabled={loading}>
        {loading ? "Creating..." : submitButtonText}
      </Button>
    </form>
  );
};
