import { apiClient } from "./client";
import type {
  User,
  CreateUserDto,
  UpdateUserDto,
  AssignCompanyDto,
  UserCompany,
} from "@/types";

export const usersApi = {
  // Get all users
  getAll: async (): Promise<User[]> => {
    return apiClient.get<User[]>("/users");
  },

  // Get user by ID
  getById: async (id: string): Promise<User> => {
    return apiClient.get<User>(`/users/${id}`);
  },

  // Create user
  create: async (data: CreateUserDto): Promise<User> => {
    return apiClient.post<User>("/users", data);
  },

  // Update user
  update: async (id: string, data: UpdateUserDto): Promise<User> => {
    return apiClient.patch<User>(`/users/${id}`, data);
  },

  // Delete user
  delete: async (id: string): Promise<User> => {
    return apiClient.delete<User>(`/users/${id}`);
  },

  // Assign user to company
  assignToCompany: async (
    userId: string,
    data: AssignCompanyDto
  ): Promise<UserCompany> => {
    return apiClient.post<UserCompany>(`/users/${userId}/companies`, data);
  },

  // Remove user from company
  removeFromCompany: async (
    userId: string,
    companyId: string
  ): Promise<void> => {
    return apiClient.delete<void>(`/users/${userId}/companies/${companyId}`);
  },

  // Get user's companies
  getUserCompanies: async (userId: string): Promise<UserCompany[]> => {
    return apiClient.get<UserCompany[]>(`/users/${userId}/companies`);
  },
};
