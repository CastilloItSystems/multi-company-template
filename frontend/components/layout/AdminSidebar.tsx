"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "primereact/button";

export default function AdminSidebar() {
  const pathname = usePathname();

  const items = [
    { label: "Dashboard", icon: "pi pi-home", to: "/dashboard" },
    { label: "Users", icon: "pi pi-users", to: "/users" },
    { label: "Companies", icon: "pi pi-building", to: "/companies" },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-lg font-bold">Admin</h2>
        </div>

        <nav className="space-y-1">
          {items.map((it) => (
            <Link
              key={it.to}
              href={it.to}
              className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 ${
                pathname?.startsWith(it.to)
                  ? "bg-gray-100 dark:bg-gray-700"
                  : ""
              }`}
            >
              <i className={`${it.icon} text-lg`} />
              <span>{it.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-6">
          <Button
            label="Crear Empresa"
            icon="pi pi-plus"
            className="w-full"
            onClick={() => (window.location.href = "/companies/new")}
          />
        </div>
      </div>
    </aside>
  );
}
