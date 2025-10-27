import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    loadUser,
    clearError,
  } = useAuthStore();

  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    loadUser,
    clearError,
  };
};
