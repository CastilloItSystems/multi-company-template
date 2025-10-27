"use client";

import { useRouter, useParams } from "next/navigation";
import { Button } from "primereact/button";

export default function CompanyNotFound() {
  const router = useRouter();
  const params = useParams();
  const companyCode = (params?.companyCode as string) || "";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          Empresa no encontrada
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          La empresa{" "}
          <strong>{companyCode ? companyCode.toUpperCase() : "—"}</strong> no
          existe o no tienes acceso.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            label="Volver"
            icon="pi pi-arrow-left"
            className="p-button-outlined"
            onClick={() => router.back()}
          />

          <Button
            label="Ir al Dashboard de la Empresa"
            icon="pi pi-th-large"
            severity="secondary"
            onClick={() => router.push(`/${companyCode}`)}
          />

          <Button
            label="Ir al Admin"
            icon="pi pi-user"
            onClick={() => router.push("/dashboard")}
            className="hidden sm:inline-flex"
          />
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
          Si necesitas acceso a esta empresa, contacta al administrador.
        </p>
      </div>
    </div>
  );
}
