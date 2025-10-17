import { useForm } from "react-hook-form";
import { Button, Input, Label } from "@components/ui";
import { useUser } from "@features/user/useUser";
import { NavLink, useNavigate } from "react-router-dom";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { logoutUser, loginUser, loading } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      // Optional: logout first
      await logoutUser();

      // Login
      const loggedInUser = await loginUser(data.email, data.password);

      // Clear previous errors
      setError("email", { message: "" });
      setError("password", { message: "" });

      // Navigate based on role
      if (loggedInUser.role === "ADMIN") navigate("/admin");
      else navigate("/");
    } catch (err: any) {
      // Show error from login
      setError("password", {
        message: err.message || "Invalid email or password",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-md w-full p-lg max-w-sm mx-auto pb-[100px]"
    >
      <h1 className="text-4xl font-bold text-center mb-lg">User Login</h1>

      <div className="flex flex-col font-semibold">
        <Label>Email</Label>
        <Input
          {...register("email", { required: "Email is required" })}
          type="email"
          autoComplete="username"
        />
        {errors.email && (
          <p className="text-error text-sm mt-xs">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col font-semibold">
        <Label>Password</Label>
        <Input
          {...register("password", { required: "Password is required" })}
          type="password"
          autoComplete="current-password"
        />
        {errors.password && (
          <p className="text-error text-sm mt-xs">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="h-12 w-64 self-center"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </Button>

      <p className="text-center mt-xs text-sm">
        Don't have an account?{" "}
        <NavLink
          to="/signup"
          className="text-primary hover:underline hover:text-primary/80 transition font-semibold"
        >
          Sign up
        </NavLink>
      </p>
    </form>
  );
}
