import { NextRequest, NextResponse } from "next/server";
import { SERVER_API_BASE_URL } from "@/lib/env";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
  }

  const issuer = process.env.ZITADEL_ISSUER || "http://localhost:8080";
  const clientId = process.env.ZITADEL_CLIENT_ID || "392645870304100356";
  const redirectUri = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  }/api/auth/callback/zitadel`;

  const tokenResponse = await fetch(`${issuer}/oauth/v2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: clientId,
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    return NextResponse.json(
      { error: "Token exchange failed", details: errorText },
      { status: 500 }
    );
  }

  const tokens = await tokenResponse.json();
  const tokenToStore = tokens.access_token || tokens.id_token;

  // Synchronize Zitadel user into PostgreSQL via backend Auth/Me
  try {
    if (tokenToStore) {
      await fetch(`${SERVER_API_BASE_URL}/Auth/Me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenToStore}`,
          Cookie: `nudge_auth_token=${tokenToStore}`,
        },
      });
    }
  } catch (syncError) {
    console.error("Zitadel user synchronization error:", syncError);
  }

  // Redirect to dashboard and set HttpOnly cookie
  const response = NextResponse.redirect(new URL("/dashboard", request.url));

  response.cookies.set("nudge_auth_token", tokenToStore, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return response;
}