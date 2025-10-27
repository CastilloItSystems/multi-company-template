"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    // Cargar usuario al montar la aplicación
    loadUser();
  }, [loadUser]);

  return <>{children}</>;
}
