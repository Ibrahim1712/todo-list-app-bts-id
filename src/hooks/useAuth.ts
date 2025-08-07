import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import type { RegisterRequest, LoginRequest } from "@/types/user";
import { isTokenExpired, getEmailFromToken } from "@/lib/jwt";

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: () => {
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      console.log("Login successful:", response);
      if (response.data?.token) {
        const token = response.data.token;

        if (!isTokenExpired(token)) {
          localStorage.setItem("token", token);

          const email = getEmailFromToken(token);
          console.log("Login successful for email:", email);

          queryClient.invalidateQueries({ queryKey: ["profile"] });

          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 1000);
        } else {
          console.error("Received expired token");
        }
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    localStorage.removeItem("token");
    queryClient.clear();
    window.location.href = "/";
  };
};

export const useTokenInfo = () => {
  const token = localStorage.getItem("token");

  if (!token || isTokenExpired(token)) {
    return { email: null, username: null, isExpired: true };
  }

  const email = getEmailFromToken(token);
  const username = email?.split("@")[0] || null;

  return {
    email,
    username,
    isExpired: false,
  };
};
