// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 1. Scalable route prefix groups
const PROTECTED_PREFIXES = [
  "/dashboard",
  "/admin",
  "/settings",
  "/creator/studio",
];

const AUTH_PREFIXES = [
  "/auth",
];

// wildcard
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/settings/:path*",
    "/creator/studio/:path*",
    "/auth/:path*",
  ],
};

export function proxy(request: NextRequest) {
  // Read backend-issued HttpOnly cookie
  const token =
    request.cookies.get("nudge_auth_token")?.value ||
    request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const isAuthRoute = AUTH_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  // 1. Block access to protected pages if not logged in
  if (isProtected && !token) {
    const loginUrl = new URL("/auth", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Redirect authenticated users away from the login page
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

