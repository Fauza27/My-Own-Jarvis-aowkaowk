"use client";

import { useAuthStore } from "@/features/auth/store";
import { useRouter } from "next/navigation";
import { logout } from "@/features/auth/api/authApi";

export default function DashboardPage() {
  const router = useRouter();
  const { user, accessToken, clearAuth } = useAuthStore();

  const handleLogout = async () => {
    try {
      if (accessToken) {
        await logout(accessToken);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuth();
      router.push("/login");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Dashboard</h2>
        <div className="space-y-2">
          <p className="text-gray-600">
            <span className="font-medium">Email:</span> {user?.email}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">User ID:</span> {user?.id}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Email Confirmed:</span> {user?.email_confirmed ? "Yes" : "No"}
          </p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
