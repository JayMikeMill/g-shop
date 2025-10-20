import { useForm } from "react-hook-form";
import { Button, Input, Label } from "@components/ui";
import { useUser } from "@features/user/useUser";
import { NavLink, useNavigate } from "react-router-dom";
import type { User } from "shared/types";

type SignupFormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupPage() {
  const { register: registerUser, login: loginUser, loading } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<SignupFormInputs>();

  const onSubmit = async (data: SignupFormInputs) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }

    try {
      const {
        user: newUser,
        success,
        status,
        message,
      } = await registerUser(
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: "USER",
        } as User,
        data.password
      );

      if (!success || !newUser) {
        switch (status) {
          case "USER_EXISTS":
            throw new Error("An account with this email already exists");
          case "ERROR":
            console.error("Registration error:", message);
            throw new Error("Registration error");
        }
      }

      // Success → login -> redirect user
      await loginUser(newUser!.email, data.password);
      if (newUser!.role === "ADMIN") navigate("/admin");
      else navigate("/");
    } catch (err: any) {
      setError("confirmPassword", {
        message: err.message || "Registration failed",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-md w-full p-lg max-w-sm mx-auto pb-[100px]"
    >
      <h1 className="text-4xl font-bold text-center mb-lg">Create Account</h1>

      {/* First Name */}
      <div className="flex flex-row gap-md">
        <div className="flex flex-col font-semibold">
          <Label>First Name</Label>
          <Input
            {...register("firstName", { required: "First name is required" })}
            type="text"
            autoComplete="given-name"
          />
          {errors.firstName && (
            <p className="text-error font-normal text-sm mt-xs">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col font-semibold">
          <Label>Last Name</Label>
          <Input
            {...register("lastName", { required: "Last name is required" })}
            type="text"
            autoComplete="family-name"
          />
          {errors.lastName && (
            <p className="text-error font-normal text-sm mt-xs">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>
      {/* Email */}
      <div className="flex flex-col font-semibold">
        <Label>Email</Label>
        <Input
          {...register("email", { required: "Email is required" })}
          type="email"
          autoComplete="username"
        />
        {errors.email && (
          <p className="text-error font-normal text-sm mt-xs">
            {errors.email.message}
          </p>
        )}
      </div>

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
        />
        {errors.password && (
          <p className="text-error font-normal text-sm mt-xs">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col font-semibold">
        <Label>Confirm Password</Label>
        <Input
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (val) =>
              val === watch("password") || "Passwords do not match",
          })}
          type="password"
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <p className="text-error font-normal text-sm mt-xs">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        className="h-12 w-64 self-center"
        disabled={loading}
      >
        {loading ? "Registering..." : "Sign Up"}
      </Button>

      <p className="text-center mt-xs text-sm">
        Already have an account?{" "}
        <NavLink
          to="/login"
          className="text-primary hover:underline hover:text-primary/80 transition font-semibold"
        >
          Log in
        </NavLink>
      </p>
    </form>
  );
}
