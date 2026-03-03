import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = ["/", "/login", "/register", "/forgot-password"];
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith("/auth/"));

  // Check if user has auth token in localStorage (we'll check this on client side)
  // For now, we'll just allow all routes and let client-side handle auth
  // In production, you might want to use cookies for server-side auth check

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
