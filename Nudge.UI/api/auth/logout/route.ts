// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("nudge_token");
  cookieStore.delete("nudge_user_data");

  return NextResponse.json({ status: "SUCCESS", msg: "Logged out successfully", data: null });
}