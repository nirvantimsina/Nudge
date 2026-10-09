// src/features/kyc/services/kyc.service.ts
import { apiClient } from "@/lib/api-client";
import type { CreatorInfoDTO } from "../types/creator-info.types";
import type { CreatorDocsDTO } from "../types/creator-docs.types";
import type { CreatorAddressDTO } from "../types/creator-address.types";
import type { CreatorVerificationDTO } from "../types/creator-verification.types";

export const kycService = {
  getCreatorInfo: () => apiClient.get<CreatorInfoDTO>("/KYC/CreatorInfo"),
  saveCreatorInfo: (data: CreatorInfoDTO) => apiClient.post<CreatorInfoDTO, void>("/KYC/CreatorInfo", data),

  getCreatorDocs: () => apiClient.get<CreatorDocsDTO>("/KYC/CreatorDocs"),
  saveCreatorDocs: (data: CreatorDocsDTO) => apiClient.post<CreatorDocsDTO, void>("/KYC/CreatorDocs", data),

  getCreatorAddress: () => apiClient.get<CreatorAddressDTO>("/KYC/CreatorAddress"),
  saveCreatorAddress: (data: CreatorAddressDTO) => apiClient.post<CreatorAddressDTO, void>("/KYC/CreatorAddress", data),

  getCreatorVerification: () => apiClient.get<CreatorVerificationDTO>("/KYC/CreatorVerification"),
  saveCreatorVerification: (data: CreatorVerificationDTO) => apiClient.post<CreatorVerificationDTO, void>("/KYC/CreatorVerification", data),
};