"use client";

import { useParams } from "next/navigation";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { useState, useEffect } from "react";

export default function CompanyDashboardPage() {
  const params = useParams();
  const companyCode = params.companyCode as string;

  const [chartData] = useState({
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
    datasets: [
      {
        label: "Ventas",
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: "#3B82F6",
        tension: 0.4,
      },
    ],
  });

  const [chartOptions] = useState({
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        display: true,
      },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard - {companyCode.toUpperCase()}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Bienvenido al panel de control de tu empresa
        </p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ventas del Mes
              </p>
              <p className="text-3xl font-bold text-blue-600">$45,678</p>
              <p className="text-xs text-green-600 mt-1">
                <i className="pi pi-arrow-up mr-1" />
                12.5% vs mes anterior
              </p>
            </div>
            <i className="pi pi-dollar text-4xl text-blue-500" />
          </div>
        </Card>

        <Card className="shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pedidos Activos
              </p>
              <p className="text-3xl font-bold text-green-600">127</p>
              <p className="text-xs text-green-600 mt-1">
                <i className="pi pi-arrow-up mr-1" />8 nuevos hoy
              </p>
            </div>
            <i className="pi pi-shopping-cart text-4xl text-green-500" />
          </div>
        </Card>

        <Card className="shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Productos
              </p>
              <p className="text-3xl font-bold text-purple-600">342</p>
              <p className="text-xs text-gray-600 mt-1">23 con stock bajo</p>
            </div>
            <i className="pi pi-box text-4xl text-purple-500" />
          </div>
        </Card>

        <Card className="shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clientes
              </p>
              <p className="text-3xl font-bold text-orange-600">1,234</p>
              <p className="text-xs text-green-600 mt-1">
                <i className="pi pi-arrow-up mr-1" />
                15 nuevos esta semana
              </p>
            </div>
            <i className="pi pi-users text-4xl text-orange-500" />
          </div>
        </Card>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Ventas Mensuales" className="shadow-lg">
          <Chart type="line" data={chartData} options={chartOptions} />
        </Card>

        <Card title="Actividad Reciente" className="shadow-lg">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 pb-3 border-b border-gray-200 dark:border-gray-700">
              <i className="pi pi-shopping-cart text-blue-500 mt-1" />
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  Nuevo pedido #1234
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Cliente: Juan Pérez - $450.00
                </p>
                <p className="text-xs text-gray-500 mt-1">Hace 5 minutos</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 pb-3 border-b border-gray-200 dark:border-gray-700">
              <i className="pi pi-box text-green-500 mt-1" />
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  Stock actualizado
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Producto: Laptop HP - 15 unidades agregadas
                </p>
                <p className="text-xs text-gray-500 mt-1">Hace 1 hora</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 pb-3 border-b border-gray-200 dark:border-gray-700">
              <i className="pi pi-user-plus text-purple-500 mt-1" />
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  Nuevo cliente registrado
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  María García - maria@email.com
                </p>
                <p className="text-xs text-gray-500 mt-1">Hace 2 horas</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <i className="pi pi-check-circle text-green-500 mt-1" />
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white">
                  Pedido entregado
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Pedido #1230 - Cliente: Carlos López
                </p>
                <p className="text-xs text-gray-500 mt-1">Hace 3 horas</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Accesos Rápidos */}
      <Card title="Accesos Rápidos" className="shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <i className="pi pi-plus-circle text-3xl text-blue-500 mb-2" />
            <p className="font-medium text-sm">Nuevo Pedido</p>
          </button>

          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <i className="pi pi-tag text-3xl text-green-500 mb-2" />
            <p className="font-medium text-sm">Agregar Producto</p>
          </button>

          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <i className="pi pi-user-plus text-3xl text-purple-500 mb-2" />
            <p className="font-medium text-sm">Nuevo Cliente</p>
          </button>

          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <i className="pi pi-file text-3xl text-orange-500 mb-2" />
            <p className="font-medium text-sm">Ver Reportes</p>
          </button>
        </div>
      </Card>
    </div>
  );
}
