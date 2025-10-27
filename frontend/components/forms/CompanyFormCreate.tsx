"use client";

import { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import type { CreateCompanyDto } from "@/types";

type Props = {
  initial?: Partial<CreateCompanyDto>;
  submitLabel?: string;
  onSubmit: (data: CreateCompanyDto) => Promise<void> | void;
};

export default function CompanyFormCreate({
  initial = {},
  submitLabel = "Guardar",
  onSubmit,
}: Props) {
  const [name, setName] = useState(initial.name || "");
  const [code, setCode] = useState(initial.code || "");
  const [active, setActive] = useState<boolean>(initial.active ?? true);
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!name) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Nombre es requerido",
        life: 3000,
      });
      return;
    }
    if (!code) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Código es requerido",
        life: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const payload: CreateCompanyDto = {
        name,
        code,
        active,
      };
      await onSubmit(payload);
      toast.current?.show({
        severity: "success",
        summary: "Creado",
        detail: "Empresa creada correctamente",
        life: 2500,
      });
    } catch (err) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: (err as Error)?.message ?? "Error al crear empresa",
        life: 4000,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Toast ref={toast} />
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre
        </label>
        <InputText
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Código
        </label>
        <InputText
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex items-center gap-3">
        <Checkbox
          inputId="active"
          checked={active}
          onChange={(e) => setActive(e.checked ?? false)}
        />
        <label htmlFor="active" className="text-sm text-gray-700">
          Activa
        </label>
      </div>

      <div className="pt-4">
        <Button label={submitLabel} icon="pi pi-save" loading={loading} />
      </div>
    </form>
  );
}
