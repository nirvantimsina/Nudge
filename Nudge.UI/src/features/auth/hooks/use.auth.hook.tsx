// src/features/auth/hooks/use.auth.hook.tsx
"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { apiClient } from "@/src/lib/api-client";
import {
  UserAuthData,
  UserSessionData,
  LoginRequest,
  SignUpRequest,
} from "../types/auth.types";

interface AuthContextType {
  user: UserAuthData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  signup: (credentials: SignUpRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserAuthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate session on app load using the HttpOnly cookie
  const refreshSession = useCallback(async () => {
    try {
      const session = await apiClient.get<UserSessionData>("/Auth/Me");

      // Hydrate basic session state if full profile isn't already in memory
      setUser((prev) => {
        if (prev) return prev;
        return {
          userName: session.userName,
          name: session.userName,
          roleName: "",
          roleId: session.roleId,
          permissions: [],
          menuList: [],
        };
      });
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    try {
      // Calls http://localhost:5043/api/Auth/Login directly via apiClient
      const authData = await apiClient.post<LoginRequest, UserAuthData>(
        "/Auth/Login",
        credentials
      );
      setUser(authData);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (credentials: SignUpRequest) => {
    setIsLoading(true);
    try {
      const authData = await apiClient.post<SignUpRequest, UserAuthData>(
        "/Auth/SignUp",
        credentials
      );
      if (authData) {
        setUser(authData);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await apiClient.post("/Auth/Logout", {});
    } catch {
      // Clear client state even if network call fails
    } finally {
      setUser(null);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        signup,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}