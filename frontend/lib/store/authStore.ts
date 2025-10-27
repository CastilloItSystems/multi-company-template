import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, LoginCredentials, RegisterData } from "@/types";
import { authApi } from "../api/auth.api";
import { apiClient } from "../api/client";
import { cookieUtils } from "../utils/cookies";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  loadUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login(credentials);

          // Guardar token en cookies (más seguro que localStorage)
          cookieUtils.setCookie("access_token", response.access_token, 7);
          apiClient.setToken(response.access_token);

          set({
            user: response.user,
            token: response.access_token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (err: unknown) {
          const error = err as { response?: { data?: { message?: string } } };
          const errorMessage =
            error.response?.data?.message || "Error al iniciar sesión";
          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
          });
          throw err;
        }
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.register(data);

          // Guardar token en cookies (más seguro que localStorage)
          cookieUtils.setCookie("access_token", response.access_token, 7);
          apiClient.setToken(response.access_token);

          set({
            user: response.user,
            token: response.access_token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (err: unknown) {
          const error = err as { response?: { data?: { message?: string } } };
          const errorMessage =
            error.response?.data?.message || "Error al registrarse";
          set({
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
          });
          throw err;
        }
      },

      logout: () => {
        // Limpiar token de cookies
        cookieUtils.removeCookie("access_token");

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
      },

      loadUser: async () => {
        const token = cookieUtils.getCookie("access_token");

        if (!token) {
          set({ isAuthenticated: false, user: null });
          return;
        }

        set({ isLoading: true });
        try {
          const user = await authApi.getProfile();
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
          });
          cookieUtils.removeCookie("access_token");
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
);
