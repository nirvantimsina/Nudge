import { NextResponse } from "next/server";

export async function GET() {
  const issuer = process.env.ZITADEL_ISSUER!;
  const clientId = process.env.ZITADEL_CLIENT_ID!;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/zitadel`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid profile email urn:zitadel:iam:user:metadata",
    prompt: "login",
  });

  return NextResponse.redirect(`${issuer}/oauth/v2/authorize?${params.toString()}`);
}