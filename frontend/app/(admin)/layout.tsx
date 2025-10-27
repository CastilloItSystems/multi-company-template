"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import AdminSidebar from "@/components/layout/AdminSidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <i className="pi pi-spin pi-spinner text-4xl text-blue-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header/Navbar */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Admin - Multi-Company
              </h1>
            </div>

            <nav className="hidden md:flex space-x-4">
              <Button
                label="Dashboard"
                icon="pi pi-home"
                link
                onClick={() => router.push("/dashboard")}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              />
              <Button
                label="Usuarios"
                icon="pi pi-users"
                link
                onClick={() => router.push("/users")}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              />
              <Button
                label="Empresas"
                icon="pi pi-building"
                link
                onClick={() => router.push("/companies")}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              />
            </nav>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar
                  label={user?.name?.charAt(0).toUpperCase()}
                  shape="circle"
                  className="bg-blue-500 text-white"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.role}
                  </p>
                </div>
              </div>
              <Button
                icon="pi pi-sign-out"
                label="Salir"
                onClick={handleLogout}
                severity="danger"
                text
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout with Sidebar */}
      <div className="flex">
        <AdminSidebar />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
