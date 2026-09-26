// src/lib/api-client.server.ts
import { cookies } from "next/headers";
import { buildUrl, handleResponse } from "./api/envelop";
import { SERVER_API_BASE_URL } from "@/src/lib/env";

export const API_BASE_URL = "http://localhost:5043/api";

export const serverApiClient = {
  async get<TResponse>(endpoint: string, params?: Record<string, string | number | boolean | undefined>): Promise<TResponse> {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");

    const response = await fetch(buildUrl(SERVER_API_BASE_URL, endpoint, params), {
      method: "GET",
      headers: { "Content-Type": "application/json", Cookie: cookieHeader },
      cache: "no-store",
    });
    return handleResponse<TResponse>(response);
  },
};