"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface UserInfo {
  name: string;
  email: string;
  role: string;
}

export default function AccountPage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("tm_user");
    const email = localStorage.getItem("tm_email");
    const role = localStorage.getItem("tm_role");

    if (!name) {
      setLoading(false);
      return;
    }

    setUser({ name, email: email || "", role: role || "user" });
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tm_token");
    localStorage.removeItem("tm_user");
    localStorage.removeItem("tm_user_id");
    localStorage.removeItem("tm_role");
    localStorage.removeItem("tm_email");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h2>
        <p className="text-gray-600 mb-4">You need to login to view your account.</p>
        <button
          onClick={() => router.push("/login")}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">My Account</h1>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500">Name</label>
            <p className="text-lg text-gray-900">{user.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Email</label>
            <p className="text-lg text-gray-900">{user.email || "Not provided"}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Role</label>
            <p className="text-lg text-gray-900 capitalize">{user.role}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => router.push("/bookings")}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          My Bookings
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

