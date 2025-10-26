import { useEffect, useState } from "react";
import { useUser } from "@features/user/useUser";
import { useNavigate } from "react-router-dom";
import { Button } from "@components/ui";

export default function DemoModePage() {
  const { login: loginUser, logout: logoutUser, loading, user } = useUser();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleDemoLogin = async () => {
    try {
      setError(null);
      await logoutUser();
      const { user: loggedInUser, status } = await loginUser(
        "demosite@gmail.com",
        "demo1234"
      );

      if (status !== "SUCCESS" || !loggedInUser) {
        setError("Demo login failed. Please check if the demo account exists.");
        return;
      }

      // Redirect to home page
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Demo login failed");
    }
  };

  // Auto-login on page load
  useEffect(() => {
    if (!user && !loading) {
      handleDemoLogin();
    }
  }, [user, loading]);

  // If already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-lg">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-lg">Demo Mode</h1>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-md mb-lg">
          <p className="text-sm text-blue-800 mb-2">
            <strong>Demo Credentials:</strong>
          </p>
          <p className="text-sm text-blue-700">
            Email: demosite@gmail.com
            <br />
            Password: demo1234
          </p>
        </div>

        {loading && (
          <div className="mb-md">
            <p className="text-lg">Logging in to demo account...</p>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mt-2"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-md mb-md">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}

        <Button onClick={handleDemoLogin} disabled={loading} className="w-full">
          {loading ? "Logging in..." : "Login to Demo"}
        </Button>

        <p className="text-sm text-gray-600 mt-md">
          This will automatically log you in and take you to the home page.
        </p>
      </div>
    </div>
  );
}
