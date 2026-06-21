"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { categorySchema, CategoryFormData, useCategory } from "@/entities";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog/dialog";

import { Field, FieldContent, FieldError, FieldLabel, Input } from "@/shared";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  mode: "create" | "edit";
  categoryId?: string;

  onSubmit: (data: CategoryFormData, id?: string) => Promise<void>;
};

export function CategoryFormDialog({
  open,
  onOpenChange,
  mode,
  categoryId,
  onSubmit,
}: Props) {
  const { selected } = useCategory();

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (mode === "edit" && selected) {
      form.reset({ name: selected.name });
    }

    if (mode === "create") {
      form.reset({ name: "" });
    }
  }, [mode, selected, open, form.reset]);

  const submit = async (data: CategoryFormData) => {
    await onSubmit(data, categoryId);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Criar categoria" : "Editar categoria"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
          
          <Field>
            <FieldLabel>Nome da categoria</FieldLabel>

            <FieldContent>
              <Input
                {...form.register("name")}
                type="text"
              />
            </FieldContent>

            <FieldError errors={[form.formState.errors.name]} />
          </Field>

          <button type="submit" disabled={form.formState.isSubmitting} className="w-full">
            {mode === "create" ? "Criar" : "Salvar alterações"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}