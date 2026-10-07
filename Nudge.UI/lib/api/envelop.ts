import { ApiResponse } from "@/src/types/api.types";

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

export async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) return undefined as T;

  let envelope: ApiResponse<T>;
  try {
    envelope = await response.json();
  } catch {
    throw new ApiServerError("UNKNOWN", `HTTP Error: ${response.status}`, response.status);
  }

  if (!response.ok || envelope.status !== "0") {
    throw new ApiServerError(envelope.status ?? String(response.status), envelope.msg, response.status);
  }

  return envelope.data;
}

export function buildUrl(base: string, endpoint: string, params?: Record<string, string | number | boolean | undefined>) {
  const url = new URL(`${base}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) url.searchParams.set(key, String(value));
    });
  }
  return url.toString();
}