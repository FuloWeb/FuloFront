"use client";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
  Field,
  FieldLabel,
  FieldContent,
  FieldError,
} from "@/shared/ui/field";
import { useLoginForm } from "./useForm";

export function LoginForm() {
  const { form, onSubmit } = useLoginForm();

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-4 my-12 max-w-1/2 mx-auto"
    >
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

      <Button
        type="submit"
        className="w-1/2 mx-auto mt-10"
      >
        Entrar
      </Button>
    </form>
  );
}