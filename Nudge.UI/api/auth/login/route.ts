// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiResponse, LoginRequest, UserAuthData } from "@/src/features/auth/types/auth.types";

export async function POST(req: Request) {
  try {
    const credentials: LoginRequest = await req.json();

    // 1. Forward directly to your core backend service
    const backendRes = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const resData: ApiResponse<UserAuthData> = await backendRes.json();

    if (!backendRes.ok || resData.status !== "SUCCESS") {
      return NextResponse.json(
        { status: "ERROR", msg: resData.msg || "Authentication failed", data: null },
        { status: backendRes.status || 400 }
      );
    }

    // 2. Set HttpOnly cookie for the returned token
    const cookieStore = await cookies();
    cookieStore.set("nudge_token", resData.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    // 3. Keep user profile in an accessible cookie (or let the client hydrate from data)
    cookieStore.set("nudge_user_data", JSON.stringify(resData.data), {
      httpOnly: false, // Accessible to read client side if needed
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return NextResponse.json(resData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { status: "ERROR", msg: error.message || "Network gateway error", data: null },
      { status: 500 }
    );
  }
}