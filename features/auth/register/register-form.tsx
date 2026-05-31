"use client";

import { useRegisterForm } from "./useForm";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/shared/ui/field";

export function RegisterForm() {
  const { form, onSubmit } = useRegisterForm();

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-3 my-12 max-w-1/2 mx-auto"
    >
      <Field>
        <FieldLabel>Nome</FieldLabel>

        <FieldContent>
          <Input
            {...form.register("name")}
            placeholder="Seu nome"
          />
        </FieldContent>

        <FieldError errors={[form.formState.errors.name]} />
      </Field>

      <Field>
        <FieldLabel>E-mail</FieldLabel>

        <FieldContent>
          <Input
            {...form.register("email")}
            type="email"
            placeholder="john@email.com"
          />
        </FieldContent>

        <FieldError errors={[form.formState.errors.email]} />
      </Field>

      <Field>
        <FieldLabel>Senha</FieldLabel>

        <FieldContent>
          <Input
            {...form.register("password")}
            type="password"
          />
        </FieldContent>

        <FieldError errors={[form.formState.errors.password]} />
      </Field>

      <Field>
        <FieldLabel>Endereço</FieldLabel>

        <FieldContent>
          <Input
            {...form.register("address")}
            placeholder="Rua José Espinola, 890"
          />
        </FieldContent>

        <FieldError errors={[form.formState.errors.address]} />
      </Field>

      <Button
        type="submit"
        className="w-1/2 mt-10 mx-auto"
      >
        Criar sua conta
      </Button>
    </form>
  );
}