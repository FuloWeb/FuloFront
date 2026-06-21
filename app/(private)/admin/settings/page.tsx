"use client";

import { useEffect, useState } from "react";
import { Table } from "@/shared";
import { Plus } from "lucide-react";
import { useCategory, Category } from "@/entities";
import { CategoryFormDialog } from "@/entities/category/ui/Form";

export default function AdminSettings() {
  const {
    categories,
    deleteCategory,
    selected,
    addCategory,
    updateCategory,
    selectCategory,
    fetchCategories,
  } = useCategory();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");

  const columns = [
    {
      header: "ID",
      accessor: (row: Category) => row.id,
    },
    {
      header: "Nome",
      accessor: (row: Category) => (
        <span className="font-medium">{row.name}</span>
      ),
    },
  ];

  const handleOpenCreate = () => {
    setMode("create");
    selectCategory(null);
    setOpen(true);
  };

  const handleEdit = (row: Category) => {
    setMode("edit");
    selectCategory(row);
    setOpen(true);
  };

  const handleSubmit = async (data: { name: string }) => {
    if (mode === "create") {
      await addCategory(data);
    } else if (selected) {
      await updateCategory({ ...selected, ...data });
    }
  };

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <>
      <section className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2>Categorias:</h2>

          <button
            className="flex gap-2 items-center px-3 py-1.5 text-sm rounded-md border"
            onClick={handleOpenCreate}
          >
            <Plus size={14} /> Categoria
          </button>
        </div>

        <Table
          data={categories}
          columns={columns}
          onEdit={handleEdit}
          onDelete={(row: Category) => deleteCategory(row.id)}
        />
      </section>

      <CategoryFormDialog
        open={open}
        onOpenChange={setOpen}
        mode={mode}
        categoryId={selected?.id}
        onSubmit={handleSubmit}
      />
    </>
  );
}