import { NextRequest, NextResponse } from "next/server";
import { SERVER_API_BASE_URL } from "@/lib/env";

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const backendRes = await fetch(`${SERVER_API_BASE_URL}/Onboarding/Submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Cookie: `nudge_auth_token=${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data, {
      status: backendRes.status >= 400 ? backendRes.status : 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: "1", msg: error.message || "Failed to submit onboarding" },
      { status: 500 }
    );
  }
}

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

    const backendRes = await fetch(`${SERVER_API_BASE_URL}/Onboarding/Status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Cookie: `nudge_auth_token=${token}`,
      },
    });

    const data = await backendRes.json();
    return NextResponse.json(data, {
      status: backendRes.status >= 400 ? backendRes.status : 200,
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: "1", msg: error.message || "Failed to fetch onboarding status" },
      { status: 500 }
    );
  }
}
