import { ApiResponse } from "@/src/features/auth/auth-models";
import { ApiServerError } from "./api-client";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5043/api";

/**
 * Server-only counterpart to `apiClient`. Import this ONLY in Server Components,
 * Route Handlers, or Server Actions — never in a "use client" file (there's no
 * localStorage/cookies() available in the browser bundle anyway, but this keeps
 * intent explicit and avoids it accidentally being bundled client-side).
 *
 * Unlike the client version, this does NOT read a token from localStorage —
 * the server has no access to it. Pass the token in explicitly, e.g. from a
 * cookie:
 *
 *   import { cookies } from "next/headers";
 *   import { serverApiClient } from "@/src/lib/api-client.server";
 *
 *   export default async function DashboardPage() {
 *     const token = (await cookies()).get("token")?.value;
 *     const creators = await serverApiClient.get<Creator[]>("/creators/featured", { token });
 *     return <CreatorList creators={creators} />;
 *   }
 *
 * This assumes your token is readable from a cookie. If your app currently
 * ONLY stores the token in localStorage, server-side calls can't authenticate
 * until you also set it as a cookie at login (ideally httpOnly + Secure, set
 * by your .NET API's Set-Cookie response) — that's a backend/auth change, not
 * something this client can work around.
 */

interface ServerRequestOptions {
  params?: Record<string, string | number | boolean | undefined>;
  token?: string | null;
  /** Next.js data-cache controls — only meaningful on the server. */
  cache?: RequestCache;
  next?: { revalidate?: number | false; tags?: string[] };
}

function buildHeaders(token?: string | null): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

function buildUrl(endpoint: string, params?: ServerRequestOptions["params"]) {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.set(key, String(value));
    });
  }
  return url.toString();
}

async function handleResponse<TResponse>(response: Response): Promise<TResponse> {
  if (response.status === 204) return undefined as TResponse;

  let envelope: ApiResponse<TResponse> | null = null;
  try {
    envelope = await response.json();
  } catch {
    if (!response.ok) {
      throw new ApiServerError("UNKNOWN", `HTTP Error: ${response.status}`, response.status);
    }
    throw new Error(`HTTP Error: ${response.status} (no response body)`);
  }

  if (!response.ok || envelope!.status !== "0") {
    throw new ApiServerError(envelope!.status ?? String(response.status), envelope!.msg, response.status);
  }

  return envelope!.data;
}

export const serverApiClient = {
  async get<TResponse>(endpoint: string, options: ServerRequestOptions = {}): Promise<TResponse> {
    const response = await fetch(buildUrl(endpoint, options.params), {
      method: "GET",
      headers: buildHeaders(options.token),
      cache: options.cache,
      next: options.next,
    });
    return handleResponse<TResponse>(response);
  },

  async post<TRequest, TResponse>(
    endpoint: string,
    payload: TRequest,
    options: ServerRequestOptions = {}
  ): Promise<TResponse> {
    const response = await fetch(buildUrl(endpoint, options.params), {
      method: "POST",
      headers: buildHeaders(options.token),
      body: JSON.stringify(payload),
      cache: options.cache,
      next: options.next,
    });
    return handleResponse<TResponse>(response);
  },

  async put<TRequest, TResponse>(
    endpoint: string,
    payload: TRequest,
    options: ServerRequestOptions = {}
  ): Promise<TResponse> {
    const response = await fetch(buildUrl(endpoint, options.params), {
      method: "PUT",
      headers: buildHeaders(options.token),
      body: JSON.stringify(payload),
      cache: options.cache,
      next: options.next,
    });
    return handleResponse<TResponse>(response);
  },

  async delete<TResponse>(endpoint: string, options: ServerRequestOptions = {}): Promise<TResponse> {
    const response = await fetch(buildUrl(endpoint, options.params), {
      method: "DELETE",
      headers: buildHeaders(options.token),
      cache: options.cache,
      next: options.next,
    });
    return handleResponse<TResponse>(response);
  },
};
