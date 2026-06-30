"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Field, FieldContent, FieldError, FieldLabel, Input } from "@/shared/ui";
import { shippingSchema, ShippingFormData } from "../model";

type Props = {
  onCalculate?: (cep: string) => void;
};

export function ShippingField({ onCalculate }: Props) {
  const form = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: { cep: "" },
  });

  const submit = (data: ShippingFormData) => {
    onCalculate?.(data.cep);
  };

  return (
    <form onSubmit={form.handleSubmit(submit)}>
      <Field>
        <FieldLabel>Meios de Envio</FieldLabel>

        <FieldContent className="flex-row gap-2">
          <Input
            {...form.register("cep")}
            type="text"
            placeholder="Digite seu CEP"
            maxLength={9}
          />

          <button
            type="submit"
            className="shrink-0 text-sm font-medium text-primary underline-offset-2 hover:underline"
          >
            Calcular
          </button>
        </FieldContent>

        <FieldError errors={[form.formState.errors.cep]} />
      </Field>
    </form>
  );
}
