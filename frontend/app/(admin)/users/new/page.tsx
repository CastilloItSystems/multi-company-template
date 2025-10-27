"use client";

import { useRouter } from "next/navigation";
import { usersApi } from "@/lib/api/users.api";
import UserFormCreate from "@/components/forms/UserFormCreate";
import type { CreateUserDto } from "@/types";

export default function NewUserPage() {
  const router = useRouter();

  const handleCreate = async (data: CreateUserDto) => {
    await usersApi.create(data);
    router.push("/users");
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Crear Usuario</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-md p-6">
        <UserFormCreate onSubmit={handleCreate} submitLabel="Crear Usuario" />
      </div>
    </div>
  );
}
