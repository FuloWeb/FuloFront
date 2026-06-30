import { z } from "zod";

export const reportPeriodSchema = z
  .object({
    start: z.string().min(1, "Informe a data inicial"),
    end: z.string().min(1, "Informe a data final"),
  })
  .refine((data) => new Date(data.end) >= new Date(data.start), {
    message: "A data final deve ser maior ou igual à data inicial",
    path: ["end"],
  });

export type ReportPeriodFormData = z.infer<typeof reportPeriodSchema>;
