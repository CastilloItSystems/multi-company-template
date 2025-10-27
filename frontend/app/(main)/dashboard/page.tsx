"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { Card } from "primereact/card";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
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
              <p className="text-3xl font-bold text-green-600">-</p>
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
