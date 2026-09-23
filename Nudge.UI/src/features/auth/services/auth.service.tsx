import { apiClient } from "@/lib/api-client";
import { LoginRequest, UserAuthData } from "@/src/features/auth/types/auth.types";

export const authService = {
  login: async (payload: LoginRequest): Promise<UserAuthData> => {
    return await apiClient.post<LoginRequest, UserAuthData>("/auth", payload);
  }
};