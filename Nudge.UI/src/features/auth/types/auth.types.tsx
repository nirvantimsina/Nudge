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

export interface MenuItem {
  menuId: number;
  menuName: string;
  parentId: number;
  icon: string | null;
  path: string;
  menuOrder: number;
  childId: number | null;
}

export interface UserAuthData {
  token?: string; // Stored in HttpOnly cookie; may be omitted or empty in body
  userName: string;
  name: string;
  roleName: string;
  roleId: number;
  permissions: string[];
  menuList: MenuItem[];
}

// Lightweight session returned by /Auth/Me
export interface UserSessionData {
  userId: string;
  userName: string;
  roleId: number;
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