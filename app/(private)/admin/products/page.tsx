"use client";

import { useState } from "react";
import { Table } from "@/shared";
import { Plus } from "lucide-react";
import { Product, ProductFormData } from "@/entities";
import { useProduct } from "@/entities/product/lib";
import { ProductFormDialog } from "@/entities/product/ui";

export default function AdminProducts() {
  const { products, deleteProduct, selected, addProduct, updateProduct, selectProduct } = useProduct();

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");

  const columns = [
    { header: "ID", accessor: (row: Product) => row.id },
    { header: "Nome", accessor: (row: Product) => <span className="font-medium">{row.name}</span> },
    { header: "Preço", accessor: (row: Product) => `R$ ${row.price.toFixed(2)}` },
    { header: "Qtd", accessor: (row: Product) => row.quantity },
    { header: "Cor", accessor: (row: Product) => row.color },
  ];

  const handleOpenCreate = () => {
    setMode("create");
    selectProduct(null);
    setOpen(true);
  };

  const handleEdit = (row: Product) => {
    setMode("edit");
    selectProduct(row);
    setOpen(true);
  };

  const handleSubmit = async (data: ProductFormData) => {
    if (mode === "create") {
      await addProduct(data);
    } else if (selected) {
      await updateProduct({ ...selected, ...data });
    }
  };

  return (
    <>
      <section className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2>Produtos:</h2>

          <button
            className="flex gap-2 items-center px-3 py-1.5 text-sm rounded-md border"
            onClick={handleOpenCreate}
          >
            <Plus size={14} /> Produto
          </button>
        </div>

        <Table
          data={products}
          columns={columns}
          onEdit={handleEdit}
          onDelete={(row: Product) => deleteProduct(row.id)}
        />
      </section>

      <ProductFormDialog
        open={open}
        onOpenChange={setOpen}
        mode={mode}
        onSubmit={handleSubmit}
      />
    </>
  );
}