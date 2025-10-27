"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { Dropdown } from "primereact/dropdown";
import { useAuth } from "@/lib/hooks/useAuth";
import { UserRole } from "@/types";

export default function RegisterForm() {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: UserRole.USER,
  });

  const roleOptions = [
    { label: "Usuario", value: UserRole.USER },
    { label: "Administrador", value: UserRole.ADMIN },
    { label: "Visualizador", value: UserRole.VIEWER },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await register(formData);
      router.push("/dashboard");
    } catch (error) {
      // El error ya está manejado en el store
      console.error("Register error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <Message severity="error" text={error} className="w-full" />}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Nombre
          </label>
          <InputText
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Juan"
            className="w-full"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Apellido
          </label>
          <InputText
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Pérez"
            className="w-full"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Correo Electrónico
        </label>
        <InputText
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          className="w-full"
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Contraseña
        </label>
        <Password
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full"
          inputClassName="w-full"
          toggleMask
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Rol
        </label>
        <Dropdown
          id="role"
          name="role"
          value={formData.role}
          options={roleOptions}
          onChange={(e) => setFormData({ ...formData, role: e.value })}
          placeholder="Selecciona un rol"
          className="w-full"
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        label={isLoading ? "Registrando..." : "Crear Cuenta"}
        icon={isLoading ? "pi pi-spin pi-spinner" : "pi pi-user-plus"}
        className="w-full"
        disabled={isLoading}
      />
    </form>
  );
}
