"use client";

import { useEffect, useState } from "react";
import { Table } from "@/shared";
import { Plus } from "lucide-react";
import { useUser, User } from "@/entities";
import { UserFormDialog } from "@/entities/user";

export default function AdminUsers() {
  const { users, deleteUser, selected, addUser, updateUser, selectUser, fetchUsers } = useUser();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");

  const columns = [
    { header: "ID", accessor: (row: User) => row.id },
    { header: "Nome", accessor: (row: User) => <span className="font-medium">{row.name}</span> },
    { header: "Email", accessor: (row: User) => row.email },
    { header: "Papel", accessor: (row: User) => row.role },
  ];

  const handleOpenCreate = () => {
    setMode("create");
    selectUser(null);
    setOpen(true);
  };

  const handleEdit = (row: User) => {
    setMode("edit");
    selectUser(row);
    setOpen(true);
  };

  const handleSubmit = async (data: Partial<User>) => {
    if (mode === "create") {
      await addUser(data);
    } else if (selected) {
      await updateUser({ ...selected, ...data });
    }
  };

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <>
      <section className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2>Usuários:</h2>

          <button
            className="flex gap-2 items-center px-3 py-1.5 text-sm rounded-md border"
            onClick={handleOpenCreate}
          >
            <Plus size={14} /> Usuário
          </button>
        </div>

        <Table
          data={users}
          columns={columns}
          onEdit={handleEdit}
          onDelete={(row: User) => deleteUser(row.id)}
        />
      </section>

      <UserFormDialog
        open={open}
        onOpenChange={setOpen}
        mode={mode}
        onSubmit={handleSubmit}
      />
    </>
  );
}