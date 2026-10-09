import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ provider: string }> | { provider: string } }
) {
  const { provider } = await Promise.resolve(context.params);

  const issuer = process.env.ZITADEL_ISSUER || "http://localhost:8080";
  const clientId = process.env.ZITADEL_CLIENT_ID || "392645870304100356";
  const redirectUri = `${
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  }/api/auth/callback/zitadel`;

  const validProviders: Record<string, string> = {
    google: "google",
    apple: "apple",
  };

  const idpHint = validProviders[provider.toLowerCase()] || provider;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid profile email urn:zitadel:iam:user:metadata",
    prompt: "login",
    idp_hint: idpHint,
  });

  return NextResponse.redirect(`${issuer}/oauth/v2/authorize?${params.toString()}`);
}
