/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle, Table } from "@/shared";
import { Activity, DollarSign, ShoppingCart, Users } from "lucide-react";

export default function AdminHome() {
  const mock = {
    users: 1240,
    orders: 320,
    revenue: 48230,
    activeSessions: 87,

    recentOrders: [
      { id: 1, user: "João Silva", total: 120.5, status: "Pago" },
      { id: 2, user: "Maria Souza", total: 89.9, status: "Pendente" },
      { id: 3, user: "Carlos Lima", total: 230.0, status: "Pago" },
      { id: 4, user: "Ana Costa", total: 59.0, status: "Cancelado" },
    ],
  };

    const columns = [
      {
        header: "ID",
        accessor: (row: any) => `#${row.id}`,
      },
      {
        header: "Usuário",
        accessor: (row: any) => row.user,
      },
      {
        header: "Total",
        accessor: (row: any) => `R$ ${row.total}`,
      },
      {
        header: "Status",
        accessor: (row: any) => {
          const color =
            row.status === "Pago"
              ? "text-green-600"
              : row.status === "Pendente"
              ? "text-yellow-600"
              : "text-red-600";

          return <span className={color}>{row.status}</span>;
        },
      },
    ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Usuários
            </CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {mock.users}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Pedidos
            </CardTitle>
            <ShoppingCart className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {mock.orders}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Receita
            </CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            R$ {mock.revenue}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Sessões ativas
            </CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {mock.activeSessions}
          </CardContent>
        </Card>

      </div>

      <Table
        data={mock.recentOrders}
        columns={columns}
        onEdit={() => {}}
        onDelete={() => {}}
      />
    </div>
  )
}