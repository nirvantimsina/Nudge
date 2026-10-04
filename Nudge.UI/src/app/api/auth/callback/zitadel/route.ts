import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing authorization code" }, { status: 400 });
  }

  const issuer = process.env.ZITADEL_ISSUER!;
  const clientId = process.env.ZITADEL_CLIENT_ID!;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/zitadel`;

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
    return NextResponse.json({ error: "Token exchange failed", details: errorText }, { status: 500 });
  }

  const tokens = await tokenResponse.json();

  // Redirect to dashboard and set HttpOnly cookie
  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  
  // Prefer access_token for API authorization
  const tokenToStore = tokens.access_token || tokens.id_token;

  response.cookies.set("nudge_auth_token", tokenToStore, {
    httpOnly: true,
    secure: false, // Set to true in production over HTTPS
    sameSite: "lax",
    path: "/",
  });

  return response;
}