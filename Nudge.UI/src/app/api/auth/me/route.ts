import { NextRequest, NextResponse } from "next/server";
import { SERVER_API_BASE_URL } from "@/lib/env";

export async function GET(request: NextRequest) {
  try {
    const token =
      request.cookies.get("nudge_auth_token")?.value ||
      request.cookies.get("token")?.value ||
      request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

    if (!token) {
      return NextResponse.json(
        { status: "1", msg: "Unauthenticated" },
        { status: 401 }
      );
    }

    const backendRes = await fetch(`${SERVER_API_BASE_URL}/Auth/Me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Cookie: `nudge_auth_token=${token}`,
      },
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(data, {
        status: backendRes.status >= 400 ? backendRes.status : 401,
      });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { status: "1", msg: error.message || "Failed to fetch session" },
      { status: 500 }
    );
  }
}
