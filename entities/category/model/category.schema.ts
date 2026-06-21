import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Nome precisa ter pelo menos 2 caracteres"),
});

export type CategoryFormData = z.infer<typeof categorySchema>;