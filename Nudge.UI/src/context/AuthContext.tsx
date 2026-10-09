// src/context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authService } from "@/src/features/auth/services/auth.service";
import type {
  UserAuthData,
  LoginRequest,
  SignUpRequest,
} from "@/src/features/auth/types/auth.types";

export interface AuthContextType {
  user: UserAuthData | null;
  creatorId: number;
  isCreator: boolean;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  signup: (credentials: SignUpRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserAuthData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate session on initial load or browser refresh via HttpOnly cookie
  const refreshSession = useCallback(async () => {
    try {
      const session = await authService.getCurrentSession();

      if (session && session.userId) {
        setUser({
          userId: session.userId,
          userName: session.userName,
          name: session.name || session.userName,
          roleId: session.roleId,
          roleName: session.roleId === 1 ? "Admin" : "Creator",
          creatorId: session.creatorId ?? 0,
          permissions: session.permissions ?? [],
          isKycVerified: session.isKycVerified ?? false,
        });
      } else {
        setUser(null);
      }
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
      const authData = await authService.login(credentials);
      setUser(authData);
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (credentials: SignUpRequest) => {
    setIsLoading(true);
    try {
      const authData = await authService.signup(credentials);
      if (authData) {
        setUser(authData);
      }
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch {
      // Clear client session even if backend logout fails
    } finally {
      setUser(null);
      setIsLoading(false);
      window.location.href = "/auth";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        creatorId: user?.creatorId ?? 0,
        isCreator: Boolean(user?.creatorId && user.creatorId > 0),
        isAuthenticated: !!user,
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

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
