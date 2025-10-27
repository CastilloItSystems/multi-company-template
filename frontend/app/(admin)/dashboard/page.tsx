"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useState, useEffect } from "react";
import { companiesApi } from "@/lib/api/companies.api";
import type { Company } from "@/types";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const data = await companiesApi.getActive();
        setCompanies(data);
      } catch (error) {
        console.error("Error loading companies:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard Administrativo
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Bienvenido, {user?.firstName} {user?.lastName}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Usuarios" className="shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-blue-600">-</p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Total de usuarios
              </p>
            </div>
            <i className="pi pi-users text-4xl text-blue-500" />
          </div>
        </Card>

        <Card title="Empresas" className="shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-green-600">
                {loading ? "..." : companies.length}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Total de empresas
              </p>
            </div>
            <i className="pi pi-building text-4xl text-green-500" />
          </div>
        </Card>

        <Card title="Rol Actual" className="shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-purple-600 capitalize">
                {user?.role}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Tu rol en el sistema
              </p>
            </div>
            <i className="pi pi-user text-4xl text-purple-500" />
          </div>
        </Card>
      </div>

      {/* Selector de Empresas */}
      <Card title="Mis Empresas" className="shadow-lg">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Selecciona una empresa para acceder a su panel de control
        </p>
        {loading ? (
          <div className="text-center py-8">
            <i className="pi pi-spin pi-spinner text-3xl text-blue-500" />
          </div>
        ) : companies.length === 0 ? (
          <div className="text-center py-8">
            <i className="pi pi-building text-5xl text-gray-300 mb-4" />
            <p className="text-gray-500">No hay empresas disponibles</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {companies.map((company) => (
              <div
                key={company.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
                onClick={() => router.push(`/${company.code}`)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                      {company.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Código: {company.code.toUpperCase()}
                    </p>
                  </div>
                  <i className="pi pi-building text-2xl text-blue-500" />
                </div>
                <Button
                  label="Acceder"
                  icon="pi pi-arrow-right"
                  className="w-full"
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/${company.code}`);
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card title="Información de la Cuenta" className="shadow-lg">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Email:
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {user?.email}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Nombre:
            </span>
            <span className="text-gray-600 dark:text-gray-400">
              {user?.firstName} {user?.lastName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Rol:
            </span>
            <span className="text-gray-600 dark:text-gray-400 capitalize">
              {user?.role}
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
}
