import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/src/features/auth/services/auth-service";
import { LoginRequest } from "@/src/features/auth/models/auth-models";
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

      localStorage.setItem("token", data.token);
      localStorage.setItem("user_menu", JSON.stringify(data.menuList));
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

  return { login, isLoading, error };
}