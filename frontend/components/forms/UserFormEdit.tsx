"use client";

import { useState, useEffect, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import type { UpdateUserDto, UserRole } from "@/types";

type Props = {
  initial?: Partial<UpdateUserDto> & { email?: string };
  submitLabel?: string;
  onSubmit: (data: UpdateUserDto) => Promise<void> | void;
};

export default function UserFormEdit({
  initial = {},
  submitLabel = "Guardar",
  onSubmit,
}: Props) {
  const [email] = useState(initial.email || "");
  const [name, setName] = useState(initial.name || "");

  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole | undefined>(
    initial.role as UserRole | undefined
  );
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast | null>(null);

  useEffect(() => {
    setName(initial.name || "");

    setRole(initial.role as UserRole | undefined);
  }, [initial]);

  const roles = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
    { label: "Viewer", value: "viewer" },
  ];

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    // Ensure at least one updatable field is present
    if (!name && !role && !password) {
      toast.current?.show({
        severity: "warn",
        summary: "Sin cambios",
        detail: "Complete al menos un campo para actualizar",
        life: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const payload: UpdateUserDto = {
        email: undefined,
        name: name || undefined,
        role: role,
      };
      if (password && password.length < 6) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Password mínimo 6 caracteres",
          life: 3000,
        });
        setLoading(false);
        return;
      }
      if (password) payload.password = password;
      await onSubmit(payload);
      toast.current?.show({
        severity: "success",
        summary: "Actualizado",
        detail: "Usuario actualizado correctamente",
        life: 2500,
      });
    } catch (err) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: (err as Error)?.message ?? "Error al actualizar usuario",
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
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <InputText value={email} disabled className="w-full bg-gray-100" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            Apellido
          </label>
          <InputText
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Rol</label>
        <Dropdown
          value={role}
          options={roles}
          onChange={(e) => setRole(e.value)}
          placeholder="Selecciona un rol"
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password (dejar vacío para no cambiar)
        </label>
        <Password
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          feedback={false}
          toggleMask
          className="w-full"
        />
      </div>

      <div className="pt-4">
        <Button label={submitLabel} icon="pi pi-save" loading={loading} />
      </div>
    </form>
  );
}
