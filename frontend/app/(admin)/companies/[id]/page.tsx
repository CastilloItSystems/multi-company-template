"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { companiesApi } from "@/lib/api/companies.api";
import CompanyFormEdit from "@/components/forms/CompanyFormEdit";
import type { Company, UpdateCompanyDto } from "@/types";

export default function EditCompanyPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const router = useRouter();
  const [initial, setInitial] = useState<Partial<Company> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const c = await companiesApi.getById(id);
        setInitial(c);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleUpdate = async (data: UpdateCompanyDto) => {
    await companiesApi.update(id, data);
    router.push("/companies");
  };

  if (loading || !initial) return <div className="p-6">Cargando...</div>;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Editar Empresa</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-md p-6">
        <CompanyFormEdit
          initial={initial as Partial<Company>}
          onSubmit={handleUpdate}
          submitLabel="Actualizar Empresa"
        />
      </div>
    </div>
  );
}
