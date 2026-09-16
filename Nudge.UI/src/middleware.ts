import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("nudge_token")?.value;
  const { pathname } = request.nextUrl;

  const protectedPrefixes = ["/studio", "/dashboard", "/admin"];
  const isProtected = protectedPrefixes.some((path) => pathname.startsWith(path));

  // 1. Block unauthenticated access to studio/dashboard
  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Redirect logged-in users away from the login page
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/studio", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio/:path*", "/dashboard/:path*", "/admin/:path*", "/login"],
};