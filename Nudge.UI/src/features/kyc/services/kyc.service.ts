import { apiClient } from "@/lib/api-client";
import { CreatorInfoDTO, CreatorInfoResponse } from "../types/creator-info.types";

export interface StatusResponse {
  status: string;
  msg: string;
}

export const kycService = {
  // Returns CreatorInfoResponse directly (unpacked by handleResponse)
  getCreatorInfo: () =>
    apiClient.get<CreatorInfoResponse>("/KYC/CreatorInfo"),

  saveCreatorInfo: (data: CreatorInfoDTO, isUpdate: boolean = false) => {
    if (isUpdate) {
      return apiClient.put<CreatorInfoDTO, StatusResponse>("/KYC/CreatorInfo", data);
    }
    return apiClient.post<CreatorInfoDTO, StatusResponse>("/KYC/CreatorInfo", data);
  },
};