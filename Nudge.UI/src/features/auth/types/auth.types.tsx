// src/features/auth/types/auth.types.ts

export interface LoginRequest {
  userName: string;
  password?: string;
}

export interface SignUpRequest {
  userName: string;
  password?: string;
  name: string;
  address?: string;
  phone?: string;
}

export interface UserAuthData {
  userId: number,
  token?: string;
  userName: string;
  name: string;
  roleName: string;
  creatorId: number;
  roleId: number;
  permissions: string[];
  isKycVerified: boolean;
}

export interface UserSessionData {
  userId: number;
  userName: string;
  name?: string;
  roleId: number;
  creatorId: number;
  isKycVerified?: boolean;
  permissions?: string[];
}

export interface ApiResponse<T> {
  status: string;
  msg: string;
  data: T;
}

export interface AuthState {
  user: UserAuthData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}