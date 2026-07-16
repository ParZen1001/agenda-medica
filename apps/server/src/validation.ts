import { z } from "zod";

export const citaSchema = z.object({
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
  hora: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, "Formato de hora inválido (HH:mm)"),
  descripcion: z.string().min(3, "La descripción debe tener al menos 3 caracteres").max(255),
});

export const medicamentoSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres").max(150),
  horario: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, "Formato de horario inválido (HH:mm)"),
  frecuencia: z.string().min(2, "Indica la frecuencia (ej. Cada 8 horas)").max(100),
  observaciones: z.string().max(500).optional().nullable(),
});

export type CitaInput = z.infer<typeof citaSchema>;
export type MedicamentoInput = z.infer<typeof medicamentoSchema>;
