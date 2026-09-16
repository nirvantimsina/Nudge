import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { authService } from "@/src/features/auth/services/auth.service";
import { LoginRequest } from "@/src/features/auth/types/auth.types";
import { ApiServerError } from "@/src/lib/api-client";
import { getErrorMessage } from "@/src/constants/error-codes";

export function useAuth() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await authService.login(credentials);

      // 1. Keep localStorage if client components need quick access
      localStorage.setItem("token", data.token);
      localStorage.setItem("user_menu", JSON.stringify(data.menuList));

      // 2. SET COOKIE so src/middleware.ts can read it on the server
      Cookies.set("token", data.token, {
        expires: 30, // 30 days
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });

      router.push("/dashboard");
    } catch (err: any) {
      if (err instanceof ApiServerError) {
        setError(getErrorMessage(err.statusCode));
      } else {
        setError("Network error: Server could not be reached.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_menu");
    Cookies.remove("token", { path: "/" });
    router.push("/login");
  };

  return { login, logout, isLoading, error };
}