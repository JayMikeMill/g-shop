// src/pages/AdminLoginPage.tsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "@features/user/useUser";
import { AnimatedDialog, Button, Input } from "@components/ui";

export default function AdminLoginPage() {
  const { user, loginUser } = useUser();

  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authorized = user && user.role === "ADMIN";

  useEffect(() => {
    if (authorized) {
      navigate("/admin", { replace: true });
    }
  }, [authorized, navigate]);

  // Redirect after login (default to home)
  const from = (location.state as any)?.from?.pathname || "/";

  const handleLogin = async (email: string, password: string) => {
    setError(null);
    setLoading(true);
    try {
      // await registerUser(
      //   {
      //     ...emptyUser,
      //     email,
      //     role: "ADMIN",
      //     firstName: "Aptotek",
      //     lastName: "Admin",
      //   },
      //   password
      // );

      await loginUser(email, password);

      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || "Failed to login");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <AdminLoginDialog
        open={true}
        loading={loading}
        error={error}
        onClose={() => {}}
        onSubmit={handleLogin}
      />
    </div>
  );
}

interface AdminLoginDialogProps {
  open: boolean;
  onClose: () => void;
  loading?: boolean;
  error?: string | null;
  onSubmit?: (email: string, password: string) => Promise<void>;
}

function AdminLoginDialog({
  open,
  onClose,
  loading = false,
  error,
  onSubmit,
}: AdminLoginDialogProps & { fullScreen?: boolean }) {
  const [email, setEmail] = useState("aptotekinfo@gmail.com");
  const [password, setPassword] = useState("aptotek2025");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit) return;

    await onSubmit(email, password); // await so parent can handle loading & errors
  };

  return (
    <AnimatedDialog
      title="Admin Login"
      titleClassName="text-center"
      showXButton={false}
      open={open}
      onClose={onClose || (() => {})}
      className="w-full max-w-md mx-lg"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-md w-full p-lg"
      >
        <label className="flex flex-col gap-xs text-base font-semibold text-textSecondary">
          <span className="mb-xs">Email</span>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </label>
        <label className="flex flex-col gap-xs text-base font-semibold text-textSecondary">
          <span className="mb-xs">Password</span>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </label>
        {error && (
          <p className="text-error text-base text-center mt-xs">{error}</p>
        )}
        <Button
          type="submit"
          className="h-12 w-64 self-center"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </AnimatedDialog>
  );
}
