import { apiClient } from "@/lib/api-client";
import { CreatorInfoDTO, CreatorInfoResponse } from "../types/creator-info.types";

export const kycService = {
  getCreatorInfo: () => 
    apiClient.get<CreatorInfoResponse>("/KYC/CreatorInfo"),

  saveCreatorInfo: (data: CreatorInfoDTO, isUpdate: boolean = false) => {
    if (isUpdate) {
      return apiClient.put<CreatorInfoDTO, { status: string; message: string }>("/KYC/CreatorInfo", data);
    }
    return apiClient.post<CreatorInfoDTO, { status: string; message: string }>("/KYC/CreatorInfo", data);
  },
};