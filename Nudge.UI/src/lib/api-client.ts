import { ApiResponse } from "@/src/features/auth/types/auth.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5043/api";

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

function getAuthToken(): string | null {
  return typeof window !== "undefined" ? localStorage.getItem("token") : null;
}

/** Headers for JSON requests. Do NOT use this for multipart uploads — see buildAuthHeaders(). */
function buildHeaders(): Record<string, string> {
  return { "Content-Type": "application/json", ...buildAuthHeaders() };
}

/** Auth-only headers, safe to spread into any request type including multipart uploads. */
function buildAuthHeaders(): Record<string, string> {
  const headers: Record<string, string> = {};
  const token = getAuthToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
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

/** Pulls a filename out of a Content-Disposition header, e.g. `attachment; filename="report.pdf"`. */
function extractFilename(response: Response, fallback: string): string {
  const header = response.headers.get("Content-Disposition");
  const match = header?.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
  return match ? decodeURIComponent(match[1]) : fallback;
}

/** Triggers a browser "Save As" for a Blob. No-op on the server. */
export function triggerBrowserDownload(blob: Blob, filename: string) {
  if (typeof window === "undefined") return;
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export const apiClient = {
  async get<TResponse>(endpoint: string, options: RequestOptions = {}): Promise<TResponse> {
    const response = await fetch(buildUrl(endpoint, options.params), {
      method: "GET",
      headers: buildHeaders(),
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
      signal: options.signal,
    });
    return handleResponse<TResponse>(response);
  },

  async delete<TResponse>(endpoint: string, options: RequestOptions = {}): Promise<TResponse> {
    const response = await fetch(buildUrl(endpoint, options.params), {
      method: "DELETE",
      headers: buildHeaders(),
      signal: options.signal,
    });
    return handleResponse<TResponse>(response);
  },

  /**
   * Uploads a file (or files) as multipart/form-data. Pass a pre-built FormData,
   * or an object of fields/files and it'll build the FormData for you.
   *
   * IMPORTANT: never set "Content-Type" yourself for multipart requests — the
   * browser must set it (including the multipart boundary) automatically. That's
   * why this uses buildAuthHeaders() instead of buildHeaders().
   *
   * Example:
   *   apiClient.upload("/creators/kyc-document", { file: fileInput.files[0], docType: "citizenship" })
   */
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
      headers: buildAuthHeaders(),
      body: formData,
      signal: options.signal,
    });
    return handleResponse<TResponse>(response);
  },

  /**
   * Downloads a binary file (PDF export, CSV, image, etc). Returns the raw Blob
   * plus the filename the server suggested, and optionally triggers a browser
   * "Save As" immediately.
   *
   * Example:
   *   const { blob, filename } = await apiClient.download("/reports/monthly-payouts.pdf", {
   *     triggerSave: true,
   *   });
   */
  async download(
    endpoint: string,
    options: RequestOptions & { triggerSave?: boolean; fallbackFilename?: string } = {}
  ): Promise<{ blob: Blob; filename: string }> {
    const response = await fetch(buildUrl(endpoint, options.params), {
      method: "GET",
      headers: buildAuthHeaders(),
      signal: options.signal,
    });

    if (!response.ok) {
      // Downloads don't return your JSON envelope, so just surface the HTTP status.
      throw new ApiServerError("DOWNLOAD_FAILED", `Download failed: HTTP ${response.status}`, response.status);
    }

    const blob = await response.blob();
    const filename = extractFilename(response, options.fallbackFilename ?? "download");

    if (options.triggerSave) triggerBrowserDownload(blob, filename);

    return { blob, filename };
  },
};
