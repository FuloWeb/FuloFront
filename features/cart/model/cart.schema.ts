import { z } from "zod";

export const shippingSchema = z.object({
  cep: z
    .string()
    .min(1, "Informe o CEP")
    .regex(/^\d{5}-?\d{3}$/, "Informe um CEP válido (ex: 00000-000)"),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;
