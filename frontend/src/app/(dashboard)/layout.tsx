"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/features/auth/store";
import { isTokenExpired } from "@/features/auth/utils";
import Link from "next/link";
import { CirclePlus, CircleUserRound, House, MessageCircle, Settings, UserRound } from "lucide-react";

const navItems = [
  { href: "/dashboard", icon: House, label: "Home" },
  { href: "/dashboard/add", icon: CirclePlus, label: "Add" },
  { href: "/chat", icon: MessageCircle, label: "Chat" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  { href: "/dashboard/profile", icon: UserRound, label: "Profile" },
];

const leftItems = navItems.slice(0, 2);
const rightItems = navItems.slice(3, 5);

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
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

  const avatar = {
    display_name: "Muhammad Fauza",
    avatar_url: "",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="p-4 pb-2">
        <header>
          <Link href="/dashboard" className="inline-flex items-center gap-3 group">
            {avatar.avatar_url ? (
              <Image src={avatar.avatar_url} alt="avatar profile" width={40} height={40} className="rounded-xl" />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <CircleUserRound className="w-5 h-5 text-primary" />
              </div>
            )}
            <div>
              <h1 className="text-sm font-semibold text-foreground">Hello, {avatar.display_name}</h1>
            </div>
          </Link>
        </header>
      </div>

      {/* Main content — padding bottom agar tidak tertutup navbar */}
      <main className="pb-28">{children}</main>

      {/* Bottom Navigation — fixed full width */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-card/95 backdrop-blur supports-backdrop-filter:bg-card/85 rounded-t-lg">
        <ul className="grid w-full grid-cols-5 items-end px-2 pt-2 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
          {/* Item Kiri */}
          {leftItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex flex-col items-center justify-center gap-0.5 rounded-xl px-3 py-1.5 transition-colors duration-200
                    ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`} />
                  <span className="text-[10px] font-medium">{label}</span>
                </Link>
              </li>
            );
          })}

          {/* FAB Button Tengah */}
          <li className="flex justify-center">
            <Link
              href="/dashboard/add"
              className="-mt-5 flex h-20 w-20 items-center justify-center rounded-full border border-primary/20 bg-primary text-primary-foreground
                        shadow-lg shadow-primary/30 transition-transform duration-200 hover:scale-[1.03] active:scale-95"
              aria-label="Tambah baru"
            >
              <MessageCircle className="h-5 w-5 stroke-[2.5]" />
            </Link>
          </li>

          {/* Item Kanan */}
          {rightItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex flex-col items-center justify-center gap-0.5 rounded-xl px-3 py-1.5 transition-colors duration-200
                    ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`} />
                  <span className="text-[10px] font-medium">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
