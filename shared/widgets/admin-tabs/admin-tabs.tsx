"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  {
    label: "Dashboard",
    href: "/admin",
    adminOnly: true,
  },
  {
    label: "Usuários",
    href: "/admin/users",
  },
  {
    label: "Produtos",
    href: "/admin/products",
  },
  {
    label: "Configurações",
    href: "/admin/settings",
  },
];

export function AdminTabs() {
  const pathname = usePathname();

  return (
    <div className="flex gap-2 border-b px-6 py-3 bg-white">
      {tabs
        .map((tab) => {
          const active = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md transition",
                active
                  ? "bg-black text-white"
                  : "text-muted-foreground hover:text-black hover:bg-muted"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
    </div>
  );
}