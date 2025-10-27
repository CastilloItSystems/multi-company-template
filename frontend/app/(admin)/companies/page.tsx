"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { companiesApi } from "@/lib/api/companies.api";
import type { Company } from "@/types";
import { Button } from "primereact/button";

export default function CompaniesListPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const load = async () => {
    setLoading(true);
    try {
      const res = await companiesApi.getAll();
      setCompanies(res || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar esta empresa?")) return;
    try {
      await companiesApi.delete(id);
      await load();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Empresas</h2>
        <div>
          <Button
            label="Nueva Empresa"
            icon="pi pi-plus"
            onClick={() => router.push("/companies/new")}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                Código
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                Activa
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {companies.map((c) => (
              <tr key={c.id}>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                  {c.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                  {c.code}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                  {c.active ? "Sí" : "No"}
                </td>
                <td className="px-6 py-4 text-sm text-right space-x-2">
                  <Button
                    label="Editar"
                    icon="pi pi-pencil"
                    className="mr-2"
                    onClick={() => router.push(`/companies/${c.id}`)}
                  />
                  <Button
                    label="Eliminar"
                    icon="pi pi-trash"
                    severity="danger"
                    onClick={() => handleDelete(c.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {companies.length === 0 && !loading && (
          <div className="p-6 text-center text-gray-500">No hay empresas</div>
        )}
      </div>
    </div>
  );
}
