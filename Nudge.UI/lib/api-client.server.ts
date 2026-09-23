// src/lib/api-client.server.ts
import { cookies } from "next/headers";
import { ApiResponse } from "@/src/features/auth/types/auth.types";
import { ApiServerError } from "./api-client";

export const API_BASE_URL = "http://localhost:5043/api";

export const serverApiClient = {
  async get<TResponse>(endpoint: string): Promise<TResponse> {
    const cookieStore = await cookies();
    const token = cookieStore.get("nudge_auth_token")?.value;

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Forward cookie directly in server requests
        Cookie: token ? `nudge_auth_token=${token}` : "",
      },
      cache: "no-store",
    });

    if (response.status === 204) return undefined as TResponse;

    const envelope: ApiResponse<TResponse> = await response.json();
    if (!response.ok || envelope.status !== "0") {
      throw new ApiServerError(envelope.status ?? String(response.status), envelope.msg, response.status);
    }

    return envelope.data;
  },
};