import { NextRequest, NextResponse } from "next/server";
import { SERVER_API_BASE_URL } from "@/lib/env";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendRes = await fetch(`${SERVER_API_BASE_URL}/Auth/Login`, {
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
      { status: "1", msg: error.message || "Failed to log in" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const issuer = process.env.ZITADEL_ISSUER || "http://localhost:8080";
  const clientId = process.env.ZITADEL_CLIENT_ID || "392645870304100356";
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/callback/zitadel`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid profile email urn:zitadel:iam:user:metadata",
    prompt: "login",
  });

  return NextResponse.redirect(`${issuer}/oauth/v2/authorize?${params.toString()}`);
}