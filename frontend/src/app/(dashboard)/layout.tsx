"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store";
import { isTokenExpired } from "@/features/auth/utils";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, accessToken, expiresAt, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!isAuthenticated || !accessToken || isTokenExpired(expiresAt)) {
      router.replace("/login");
    }
  }, [hasHydrated, isAuthenticated, accessToken, expiresAt, router]);

  if (!hasHydrated) {
    return null;
  }

  if (!isAuthenticated || !accessToken || isTokenExpired(expiresAt)) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">My Jarvis Gua</h1>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
