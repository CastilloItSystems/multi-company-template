"use client";

import { useRouter } from "next/navigation";
import { companiesApi } from "@/lib/api/companies.api";
import CompanyFormCreate from "@/components/forms/CompanyFormCreate";
import type { CreateCompanyDto } from "@/types";

export default function NewCompanyPage() {
  const router = useRouter();

  const handleCreate = async (data: CreateCompanyDto) => {
    await companiesApi.create(data);
    router.push("/companies");
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Crear Empresa</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-md p-6">
        <CompanyFormCreate
          onSubmit={handleCreate}
          submitLabel="Crear Empresa"
        />
      </div>
    </div>
  );
}
