import React from "react";
import { useUser } from "@features/user/useUser";
import { useNavigate } from "react-router-dom";
const AccountPage: React.FC = () => {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 text-center">
      <h1 className="text-4xl font-bold text-primary mb-8">Account Page</h1>
      <p className="text-lg">
        Welcome, {user?.firstName} {user?.lastName}!
      </p>
      <p className="text-lg">Email: {user?.email}</p>
      <p className="text-lg">Role: {user?.role}</p>

      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default AccountPage;
