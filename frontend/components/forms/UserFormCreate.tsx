"use client";

import { useState, useRef } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import type { CreateUserDto, UserRole } from "@/types";

type Props = {
  initial?: Partial<CreateUserDto>;
  submitLabel?: string;
  onSubmit: (data: CreateUserDto) => Promise<void> | void;
};

export default function UserFormCreate({
  initial = {},
  submitLabel = "Guardar",
  onSubmit,
}: Props) {
  const [email, setEmail] = useState(initial.email || "");
  const [firstName, setFirstName] = useState(initial.firstName || "");
  const [lastName, setLastName] = useState(initial.lastName || "");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>(
    initial.role || ("user" as UserRole)
  );
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast | null>(null);

  const roles = [
    { label: "Admin", value: "admin" },
    { label: "User", value: "user" },
    { label: "Viewer", value: "viewer" },
  ];

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    // Basic client-side validation
    if (!email) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Email es requerido",
        life: 3000,
      });
      return;
    }
    if (!firstName) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Nombre es requerido",
        life: 3000,
      });
      return;
    }
    if (!lastName) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Apellido es requerido",
        life: 3000,
      });
      return;
    }
    if (!password || password.length < 6) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Password mínimo 6 caracteres",
        life: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const payload: CreateUserDto = {
        email,
        firstName,
        lastName,
        password,
        role,
      };
      await onSubmit(payload);
      toast.current?.show({
        severity: "success",
        summary: "Creado",
        detail: "Usuario creado correctamente",
        life: 2500,
      });
    } catch (err) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: (err as Error)?.message ?? "Error al crear usuario",
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
        <InputText
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <InputText
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Apellido
          </label>
          <InputText
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
          Password
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
