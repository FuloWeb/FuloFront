"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useUser, UserRole } from "@/entities";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog/dialog";
import { Field, FieldContent, FieldError, FieldLabel, Input } from "@/shared";

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  address: z.string().min(8),
  password: z.string().min(8),
  role: z.nativeEnum(UserRole),
});

type UserFormData = z.infer<typeof userSchema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  onSubmit: (data: UserFormData) => Promise<void>;
};

export function UserFormDialog({ open, onOpenChange, mode, onSubmit }: Props) {
  const { selected } = useUser();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: { name: "", email: "", address: "", role: UserRole.CLIENT, password: "" },
  });

  useEffect(() => {
    if (mode === "edit" && selected) {
      form.reset({
        name: selected.name,
        email: selected.email,
        address: selected.address,
        role: selected.role,
      });
    }

    if (mode === "create") {
      form.reset({ name: "", email: "", address: "", role: UserRole.CLIENT, password: "" });
    }
  }, [mode, selected, open, form.reset]);

  const submit = async (data: UserFormData) => {
    await onSubmit(data);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Criar usuário" : "Editar usuário"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
          <Field>
            <FieldLabel>Nome</FieldLabel>
            <FieldContent>
              <Input {...form.register("name")} type="text" />
            </FieldContent>
            <FieldError errors={[form.formState.errors.name]} />
          </Field>

          <Field>
            <FieldLabel>Email</FieldLabel>
            <FieldContent>
              <Input {...form.register("email")} type="email" />
            </FieldContent>
            <FieldError errors={[form.formState.errors.email]} />
          </Field>

          <Field>
            <FieldLabel>Senha</FieldLabel>
            <FieldContent>
              <Input disabled={mode === 'edit'} {...form.register("password")} value={"xxxxxxxxx"} type="password" />
            </FieldContent>
            <FieldError errors={[form.formState.errors.password]} />
          </Field>

          <Field>
            <FieldLabel>Endereço</FieldLabel>
            <FieldContent>
              <Input {...form.register("address")} type="text" />
            </FieldContent>
            <FieldError errors={[form.formState.errors.address]} />
          </Field>

          {/* <Field>
            <FieldLabel>Papel</FieldLabel>
            <FieldContent>
              <select {...form.register("role")}>
                <option value={UserRole.CLIENT}>Cliente</option>
                <option value={UserRole.ADMIN}>Admin</option>
              </select>
            </FieldContent>
            <FieldError errors={[form.formState.errors.role]} />
          </Field> */}

          <button type="submit" disabled={form.formState.isSubmitting} className="w-full">
            {mode === "create" ? "Criar" : "Salvar alterações"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}