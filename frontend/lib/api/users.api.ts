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
    // Backend expects `name` (single string) instead of firstName/lastName
    const nameParts = [data.firstName, data.lastName].filter(Boolean);
    const payload: Record<string, unknown> = {
      email: data.email,
    };
    if (nameParts.length) payload.name = nameParts.join(" ");
    if (data.password) payload.password = data.password;

    return apiClient.post<User>("/users", payload);
  },

  // Update user
  update: async (id: string, data: UpdateUserDto): Promise<User> => {
    // Map frontend fields (firstName/lastName) to backend expected shape (name)
    const payload: Record<string, unknown> = {};
    if (data.email !== undefined) payload.email = data.email;
    // if either firstName or lastName provided, combine into `name`
    const nameParts = [data.name].filter(Boolean);
    if (nameParts.length) payload.name = nameParts.join(" ");
    if (data.password !== undefined) payload.password = data.password;

    return apiClient.patch<User>(`/users/${id}`, payload);
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
