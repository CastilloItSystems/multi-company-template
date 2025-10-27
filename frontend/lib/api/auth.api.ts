import { apiClient } from "./client";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  User,
} from "@/types";

export const authApi = {
  // Login
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/auth/login", credentials);
  },

  // Register
  register: async (data: RegisterData): Promise<AuthResponse> => {
    return apiClient.post<AuthResponse>("/auth/register", data);
  },

  // Get current user profile
  getProfile: async (): Promise<User> => {
    return apiClient.get<User>("/auth/profile");
  },

  // Get current user (alias)
  getMe: async (): Promise<User> => {
    return apiClient.get<User>("/auth/me");
  },
};
