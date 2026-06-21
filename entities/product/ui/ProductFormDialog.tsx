"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useCategory, ProductFormData } from "@/entities";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog/dialog";
import { Field, FieldContent, FieldError, FieldLabel, Input } from "@/shared";
import { useProduct } from "../lib";

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.coerce.number().positive(),
  quantity: z.coerce.number().nonnegative(),
  color: z.string().min(1),
  categoryId: z.coerce.number().positive(),
  file: z.instanceof(File).optional(),
});

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  onSubmit: (data: ProductFormData) => Promise<void>;
};

export function ProductFormDialog({ open, onOpenChange, mode, onSubmit }: Props) {
  const { selected } = useProduct();
  const { categories, fetchCategories } = useCategory();

  const form = useForm<ProductFormData>({
    // @ts-expect-error no time
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      color: "",
      categoryId: 0,
    },
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (mode === "edit" && selected) {
      form.reset({
        name: selected.name,
        description: selected.description ?? "",
        price: selected.price,
        quantity: selected.quantity,
        color: selected.color,
        categoryId: selected.categoryId,
      });
    }

    if (mode === "create") {
      form.reset({ name: "", description: "", price: 0, quantity: 0, color: "", categoryId: 0 });
    }
  }, [mode, selected, open, form.reset]);

  const submit = async (data: ProductFormData) => {
    await onSubmit(data);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Criar produto" : "Editar produto"}
          </DialogTitle>
        </DialogHeader>

        {/* @ts-expect-error no time  */}
        <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
          <Field>
            <FieldLabel>Nome</FieldLabel>
            <FieldContent>
              <Input {...form.register("name")} type="text" />
            </FieldContent>
            <FieldError errors={[form.formState.errors.name]} />
          </Field>

          <Field>
            <FieldLabel>Descrição</FieldLabel>
            <FieldContent>
              <Input {...form.register("description")} type="text" />
            </FieldContent>
            <FieldError errors={[form.formState.errors.description]} />
          </Field>

          <Field>
            <FieldLabel>Preço</FieldLabel>
            <FieldContent>
              <Input {...form.register("price")} type="number" step="0.01" />
            </FieldContent>
            <FieldError errors={[form.formState.errors.price]} />
          </Field>

          <Field>
            <FieldLabel>Quantidade</FieldLabel>
            <FieldContent>
              <Input {...form.register("quantity")} type="number" />
            </FieldContent>
            <FieldError errors={[form.formState.errors.quantity]} />
          </Field>

          <Field>
            <FieldLabel>Cor</FieldLabel>
            <FieldContent>
              <Input {...form.register("color")} type="text" />
            </FieldContent>
            <FieldError errors={[form.formState.errors.color]} />
          </Field>

          <Field>
            <FieldLabel>Categoria</FieldLabel>
            <FieldContent>
              <select {...form.register("categoryId")}>
                <option value={0} disabled>Selecione uma categoria</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </FieldContent>
            <FieldError errors={[form.formState.errors.categoryId]} />
          </Field>

          {mode === "create" && (
            <Field>
              <FieldLabel>Imagem</FieldLabel>
              <FieldContent>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) form.setValue("file", file);
                  }}
                />
              </FieldContent>
              <FieldError errors={[form.formState.errors.file]} />
            </Field>
          )}

          <button type="submit" disabled={form.formState.isSubmitting} className="w-full">
            {mode === "create" ? "Criar" : "Salvar alterações"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
