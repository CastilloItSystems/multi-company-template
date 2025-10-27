"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import { useAuth } from "@/lib/hooks/useAuth";

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await login(formData);
      router.push("/dashboard");
    } catch (error) {
      // El error ya está manejado en el store
      console.error("Login error:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <Message severity="error" text={error} className="w-full" />}

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
          feedback={false}
          required
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        label={isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        icon={isLoading ? "pi pi-spin pi-spinner" : "pi pi-sign-in"}
        className="w-full"
        disabled={isLoading}
      />
    </form>
  );
}
