import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect(new URL("/", "http://localhost:3000"));
  
  // Clear the cookie
  response.cookies.delete("nudge_auth_token");
  
  return response;
}