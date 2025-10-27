"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { usersApi } from "@/lib/api/users.api";
import UserFormEdit from "@/components/forms/UserFormEdit";
import type { User, UpdateUserDto } from "@/types";

export default function EditUserPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  // `params` can be a Promise in Next 16; unwrap with React.use()
  // params may be a Promise in Next.js App Router; unwrap with React.use().
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { id } = use(params as any) as { id: string };
  const router = useRouter();
  const [initial, setInitial] = useState<Partial<User> | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const u = await usersApi.getById(id);
        setInitial(u);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleUpdate = async (data: UpdateUserDto) => {
    await usersApi.update(id, data);
    router.push("/users");
  };

  if (loading || !initial) {
    return <div className="p-6">Cargando...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Editar Usuario</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-md p-6">
        <UserFormEdit
          initial={initial as Partial<User>}
          onSubmit={handleUpdate}
          submitLabel="Actualizar Usuario"
        />
      </div>
    </div>
  );
}
