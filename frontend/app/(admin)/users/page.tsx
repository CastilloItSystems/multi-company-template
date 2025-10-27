"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usersApi } from "@/lib/api/users.api";
import type { User } from "@/types";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function UsersListPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const load = async () => {
    setLoading(true);
    try {
      const res = await usersApi.getAll();
      setUsers(res || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que quieres eliminar este usuario?")) return;
    try {
      await usersApi.delete(id);
      await load();
    } catch (e) {
      console.error(e);
    }
  };

  const actionsBodyTemplate = (rowData: User) => {
    return (
      <div className="flex justify-end gap-2">
        <Button
          label="Editar"
          icon="pi pi-pencil"
          onClick={() => router.push(`/users/${rowData.id}`)}
        />
        <Button
          label="Eliminar"
          icon="pi pi-trash"
          severity="danger"
          onClick={() => handleDelete(rowData.id)}
        />
      </div>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Usuarios</h2>
        <div>
          <Button
            label="Nuevo Usuario"
            icon="pi pi-plus"
            onClick={() => router.push("/users/new")}
          />
        </div>
      </div>

      <DataTable
        value={users}
        loading={loading}
        emptyMessage="No hay usuarios"
        className="bg-white dark:bg-gray-800 shadow rounded-md"
      >
        <Column field="email" header="Email" />
        <Column field="name" header="Nombre" />
        <Column field="role" header="Rol" />
        <Column header="Acciones" body={actionsBodyTemplate} />
      </DataTable>
    </div>
  );
}
