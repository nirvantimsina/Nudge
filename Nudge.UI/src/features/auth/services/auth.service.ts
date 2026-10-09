// src/features/auth/services/auth.service.ts
import { apiClient } from "@/lib/api-client";
import type {
  LoginRequest,
  SignUpRequest,
  UserAuthData,
  UserSessionData,
} from "../types/auth.types";

export const authService = {
  login: async (credentials: LoginRequest): Promise<UserAuthData> => {
    return await apiClient.post<LoginRequest, UserAuthData>("/api/auth/login", credentials);
  },

  signup: async (credentials: SignUpRequest): Promise<UserAuthData> => {
    return await apiClient.post<SignUpRequest, UserAuthData>("/api/auth/signup", credentials);
  },

  getCurrentSession: async (): Promise<UserSessionData> => {
    return await apiClient.get<UserSessionData>("/api/auth/me");
  },

  logout: async (): Promise<void> => {
    return await apiClient.post<object, void>("/api/auth/logout", {});
  },
};
