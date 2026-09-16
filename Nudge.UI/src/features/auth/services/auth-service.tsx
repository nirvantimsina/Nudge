import { apiClient } from "../../../lib/api-client";
import { LoginRequest, UserAuthData } from "@/src/features/auth/models/auth-models";

export const authService = {
  login: async (payload: LoginRequest): Promise<UserAuthData> => {
    return await apiClient.post<LoginRequest, UserAuthData>("/Auth/Login", payload);
  }
};