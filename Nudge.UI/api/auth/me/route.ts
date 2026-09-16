// src/app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ApiResponse, UserAuthData } from "@/src/features/auth/types/auth.types";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("nudge_token")?.value;
  const userDataCookie = cookieStore.get("nudge_user_data")?.value;

  if (!token || !userDataCookie) {
    return NextResponse.json(
      { status: "UNAUTHORIZED", msg: "No active session", data: null },
      { status: 401 }
    );
  }

  try {
    const userData: UserAuthData = JSON.parse(userDataCookie);
    const response: ApiResponse<UserAuthData> = {
      status: "SUCCESS",
      msg: "Session valid",
      data: userData,
    };
    return NextResponse.json(response);
  } catch {
    return NextResponse.json(
      { status: "ERROR", msg: "Corrupted session state", data: null },
      { status: 401 }
    );
  }
}