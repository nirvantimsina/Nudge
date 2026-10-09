import { NextRequest, NextResponse } from "next/server";
import { SERVER_API_BASE_URL } from "@/lib/env";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendRes = await fetch(`${SERVER_API_BASE_URL}/Auth/SignUp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();

    if (!backendRes.ok || data.status !== "0") {
      return NextResponse.json(data, {
        status: backendRes.status >= 400 ? backendRes.status : 400,
      });
    }

    const response = NextResponse.json(data);
    const token = data?.data?.token;

    if (token) {
      response.cookies.set("nudge_auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 8, // 8 hours
      });
    }

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { status: "1", msg: error.message || "Failed to create account" },
      { status: 500 }
    );
  }
}
