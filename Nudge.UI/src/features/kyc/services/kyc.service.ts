import { CreatorInfoDTO } from "../types/creator-info.types";
import { CreatorDocsDTO } from "../types/creator-docs.types";
import { CreatorAddressDTO } from "../types/creator-address.types";
import { CreatorVerificationDTO } from "../types/creator-verification.types";
import { apiClient } from "@/lib/api-client";

async function request<T>(path: string, init?: RequestInit): Promise<T | null> {
  const res = await fetch(`/api/KYC/${path}`, {
    headers: { Accept: "application/json", ...(init?.headers ?? {}) },
    credentials: "include",
    ...init,
  });

  if (res.status === 204) return null;

  const text = await res.text();
  const body = text ? JSON.parse(text) : {};

  if (!res.ok || body.success === false) {
    throw new Error(body.message || body.title || "Request failed");
  }
  return (body.data ?? body) as T;
}

export const kycService = {
  getCreatorInfo: () => apiClient.get<CreatorInfoDTO>("/KYC/CreatorInfo"),
  saveCreatorInfo: (data: CreatorInfoDTO) => apiClient.post<CreatorInfoDTO, void>("/KYC/CreatorInfo", data),

  getCreatorDocs: () => apiClient.get<CreatorDocsDTO>("/KYC/CreatorDocs"),
  saveCreatorDocs: (data: CreatorDocsDTO) => apiClient.post<CreatorDocsDTO, void>("KYC/CreatorDocs", data),

  getCreatorAddress: () => apiClient.get<CreatorAddressDTO>("/KYC/CreatorAddress"),
  saveCreatorAddress: (data: CreatorAddressDTO) => apiClient.post<CreatorAddressDTO, void>("/KYC/CreatorAddress", data),

  getCreatorVerification: () => apiClient.get<CreatorVerificationDTO>("KYC/CreatorVerification"),
  saveCreatorVerification: (data: CreatorVerificationDTO) => apiClient.post<CreatorVerificationDTO, void>("KYC/CreatorVerification", data),
};