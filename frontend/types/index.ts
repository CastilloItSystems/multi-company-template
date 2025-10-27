// Tipos de autenticación
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: UserRole;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

// Enums
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  VIEWER = "viewer",
}

// Tipos de usuario
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  userCompanies?: UserCompany[];
}

export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  role?: UserRole;
}

// Tipos de empresa
export interface Company {
  id: string;
  name: string;
  code: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  userCompanies?: UserCompany[];
}

export interface CreateCompanyDto {
  name: string;
  code: string;
  active?: boolean;
}

export interface UpdateCompanyDto {
  name?: string;
  code?: string;
  active?: boolean;
}

// Relación Usuario-Empresa
export interface UserCompany {
  id: string;
  userId: string;
  companyId: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  user?: User;
  company?: Company;
}

export interface AssignUserDto {
  userId: string;
  role: UserRole;
}

export interface AssignCompanyDto {
  companyId: string;
  role: UserRole;
}

// Tipos de respuesta de API
export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}
