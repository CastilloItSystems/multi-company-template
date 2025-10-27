import { apiClient } from "./client";
import type {
  Company,
  CreateCompanyDto,
  UpdateCompanyDto,
  AssignUserDto,
  UserCompany,
} from "@/types";

export const companiesApi = {
  // Get all companies
  getAll: async (): Promise<Company[]> => {
    return apiClient.get<Company[]>("/companies");
  },

  // Get active companies
  getActive: async (): Promise<Company[]> => {
    return apiClient.get<Company[]>("/companies/active");
  },

  // Get company by ID
  getById: async (id: string): Promise<Company> => {
    return apiClient.get<Company>(`/companies/${id}`);
  },

  // Create company
  create: async (data: CreateCompanyDto): Promise<Company> => {
    return apiClient.post<Company>("/companies", data);
  },

  // Update company
  update: async (id: string, data: UpdateCompanyDto): Promise<Company> => {
    return apiClient.patch<Company>(`/companies/${id}`, data);
  },

  // Delete company
  delete: async (id: string): Promise<Company> => {
    return apiClient.delete<Company>(`/companies/${id}`);
  },

  // Assign user to company
  assignUser: async (
    companyId: string,
    data: AssignUserDto
  ): Promise<UserCompany> => {
    return apiClient.post<UserCompany>(`/companies/${companyId}/users`, data);
  },

  // Remove user from company
  removeUser: async (companyId: string, userId: string): Promise<void> => {
    return apiClient.delete<void>(`/companies/${companyId}/users/${userId}`);
  },

  // Get company's users
  getCompanyUsers: async (companyId: string): Promise<UserCompany[]> => {
    return apiClient.get<UserCompany[]>(`/companies/${companyId}/users`);
  },
};
