"use client";

import { useAuth } from "@/features";
import { AdminTabs, Button } from "@/shared";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const { loading, isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated || !isAdmin) {
      router.replace("/");
    }
  }, [loading, isAuthenticated, isAdmin, router]);

  const pageTitle = useMemo(() => {
    const map: Record<string, string> = {
      "/admin": "Dashboard",
      "/admin/users": "Usuários",
      "/admin/products": "Produtos",
      "/admin/settings": "Configurações",
    };

    return map[pathname] ?? "Painel Administrativo";
  }, [pathname]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-sm text-muted-foreground">
        Carregando...
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-white px-6 py-4 shadow-sm flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold tracking-tight">
            Painel Administrativo
          </h1>

          <h3 className="text-sm text-muted-foreground">
            Informações sobre {pageTitle}
          </h3>
        </div>

        <Link
          className="px-3 py-1.5 text-sm rounded-md transition border text-muted-foreground hover:text-black hover:bg-muted"
          href="/"
        >
          Ir para home
        </Link>
      </header>

      <main>
        <AdminTabs />
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}