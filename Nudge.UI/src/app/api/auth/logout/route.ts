import { NextRequest, NextResponse } from "next/server";
import { SERVER_API_BASE_URL } from "@/lib/env";

function clearAuthCookies(response: NextResponse) {
  response.cookies.delete("nudge_auth_token");
  response.cookies.delete("token");
  response.cookies.set("nudge_auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
  return response;
}

export async function POST(request: NextRequest) {
  const token =
    request.cookies.get("nudge_auth_token")?.value ||
    request.cookies.get("token")?.value;

  try {
    if (token) {
      await fetch(`${SERVER_API_BASE_URL}/Auth/Logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Cookie: `nudge_auth_token=${token}`,
        },
      });
    }
  } catch {
    // Graceful logout even if backend cannot be reached
  }

  const response = NextResponse.json({
    status: "0",
    msg: "Logged out successfully.",
  });
  return clearAuthCookies(response);
}

export async function GET(request: NextRequest) {
  const loginUrl = new URL("/auth", request.url);
  const response = NextResponse.redirect(loginUrl);
  return clearAuthCookies(response);
}