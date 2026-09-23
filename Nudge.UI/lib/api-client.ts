// src/lib/api-client.ts
import { ApiResponse } from "@/src/features/auth/types/auth.types";

export const API_BASE_URL = "http://localhost:5043/api";

export class ApiServerError extends Error {
  statusCode: string;
  httpStatus: number;
  constructor(statusCode: string, serverMessage: string, httpStatus: number) {
    super(serverMessage);
    this.name = "ApiServerError";
    this.statusCode = statusCode;
    this.httpStatus = httpStatus;
  }
}

/** Standard JSON headers. Cookies are handled by the browser engine. */
function buildHeaders(): Record<string, string> {
  return {
    "Content-Type": "application/json",
  };
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

interface RequestOptions {
  params?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
}

function buildUrl(endpoint: string, params?: RequestOptions["params"]) {
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.set(key, String(value));
    });
  }
  return url.toString();
}

export const apiClient = {
  async get<TResponse>(endpoint: string, options: RequestOptions = {}): Promise<TResponse> {
    const response = await fetch(buildUrl(endpoint, options.params), {
      method: "GET",
      headers: buildHeaders(),
      credentials: "include", // Transmit HttpOnly cookies automatically
      signal: options.signal,
    });
    return handleResponse<TResponse>(response);
  },

  async post<TRequest, TResponse>(
    endpoint: string,
    payload: TRequest,
    options: RequestOptions = {}
  ): Promise<TResponse> {
    const response = await fetch(buildUrl(endpoint, options.params), {
      method: "POST",
      headers: buildHeaders(),
      body: JSON.stringify(payload),
      credentials: "include",
      signal: options.signal,
    });
    return handleResponse<TResponse>(response);
  },

  async put<TRequest, TResponse>(
    endpoint: string,
    payload: TRequest,
    options: RequestOptions = {}
  ): Promise<TResponse> {
    const response = await fetch(buildUrl(endpoint, options.params), {
      method: "PUT",
      headers: buildHeaders(),
      body: JSON.stringify(payload),
      credentials: "include",
      signal: options.signal,
    });
    return handleResponse<TResponse>(response);
  },

  async delete<TResponse>(endpoint: string, options: RequestOptions = {}): Promise<TResponse> {
    const response = await fetch(buildUrl(endpoint, options.params), {
      method: "DELETE",
      headers: buildHeaders(),
      credentials: "include",
      signal: options.signal,
    });
    return handleResponse<TResponse>(response);
  },

  async upload<TResponse>(
    endpoint: string,
    data: FormData | Record<string, Blob | string>,
    options: RequestOptions = {}
  ): Promise<TResponse> {
    const formData =
      data instanceof FormData
        ? data
        : Object.entries(data).reduce((fd, [key, value]) => {
            fd.append(key, value);
            return fd;
          }, new FormData());

    const response = await fetch(buildUrl(endpoint, options.params), {
      method: "POST",
      credentials: "include",
      body: formData,
      signal: options.signal,
    });
    return handleResponse<TResponse>(response);
  },
};