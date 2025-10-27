"use client";

import { useRouter } from "next/navigation";
import { Button } from "primereact/button";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-xl w-full text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          La página que buscas no existe o ha sido movida.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            label="Volver"
            icon="pi pi-arrow-left"
            className="p-button-outlined"
            onClick={() => router.back()}
          />

          <Button
            label="Ir al Dashboard"
            icon="pi pi-home"
            severity="secondary"
            onClick={() => router.push("/dashboard")}
          />
        </div>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
          Si crees que esto es un error, intenta recargar la página o ponte en
          contacto con soporte.
        </p>
      </div>
    </div>
  );
}
