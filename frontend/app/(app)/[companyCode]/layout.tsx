"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { Sidebar } from "primereact/sidebar";
import { Menu } from "primereact/menu";
import type { Company } from "@/types";
import { companiesApi } from "@/lib/api/companies.api";

export default function CompanyAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const params = useParams();
  const companyCode = params.companyCode as string;

  const [company, setCompany] = useState<Company | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [loadingCompany, setLoadingCompany] = useState(true);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    const loadCompany = async () => {
      try {
        // Buscar la empresa por código
        const companies = await companiesApi.getAll();
        const found = companies.find(
          (c: Company) => c.code.toLowerCase() === companyCode.toLowerCase()
        );

        if (!found) {
          router.push("/dashboard");
          return;
        }

        setCompany(found);
      } catch (error) {
        console.error("Error loading company:", error);
        router.push("/dashboard");
      } finally {
        setLoadingCompany(false);
      }
    };

    if (isAuthenticated && companyCode) {
      loadCompany();
    }
  }, [isAuthenticated, companyCode, router]);

  if (isLoading || loadingCompany) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <i className="pi pi-spin pi-spinner text-4xl text-blue-500" />
      </div>
    );
  }

  if (!isAuthenticated || !company) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  const menuItems = [
    {
      label: "Dashboard",
      icon: "pi pi-home",
      command: () => router.push(`/${companyCode}`),
    },
    {
      separator: true,
    },
    {
      label: "Ventas",
      icon: "pi pi-shopping-cart",
      items: [
        {
          label: "Pedidos",
          icon: "pi pi-list",
          command: () => router.push(`/${companyCode}/sales/orders`),
        },
        {
          label: "Clientes",
          icon: "pi pi-users",
          command: () => router.push(`/${companyCode}/sales/customers`),
        },
      ],
    },
    {
      label: "Inventario",
      icon: "pi pi-box",
      items: [
        {
          label: "Productos",
          icon: "pi pi-tag",
          command: () => router.push(`/${companyCode}/inventory/products`),
        },
        {
          label: "Almacenes",
          icon: "pi pi-building",
          command: () => router.push(`/${companyCode}/inventory/warehouses`),
        },
      ],
    },
    {
      label: "Reportes",
      icon: "pi pi-chart-line",
      command: () => router.push(`/${companyCode}/reports`),
    },
    {
      separator: true,
    },
    {
      label: "Configuración",
      icon: "pi pi-cog",
      command: () => router.push(`/${companyCode}/settings`),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header/Navbar */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button
                icon="pi pi-bars"
                text
                onClick={() => setSidebarVisible(true)}
                className="lg:hidden"
              />

              <div className="flex items-center">
                <i className="pi pi-building text-2xl text-blue-600 mr-2" />
                <div>
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                    {company.name}
                  </h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {company.code.toUpperCase()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                icon="pi pi-th-large"
                label="Admin"
                text
                onClick={() => router.push("/dashboard")}
                tooltip="Dashboard Administrativo"
              />

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

      {/* Sidebar Mobile */}
      <Sidebar
        visible={sidebarVisible}
        onHide={() => setSidebarVisible(false)}
        className="w-64"
      >
        <div className="mb-4">
          <h2 className="text-lg font-bold">{company.name}</h2>
          <p className="text-sm text-gray-500">{company.code.toUpperCase()}</p>
        </div>
        <Menu model={menuItems} className="w-full border-none" />
      </Sidebar>

      <div className="flex">
        {/* Sidebar Desktop */}
        <aside className="hidden lg:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-[calc(100vh-4rem)]">
          <div className="p-4">
            <Menu model={menuItems} className="w-full border-none" />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
