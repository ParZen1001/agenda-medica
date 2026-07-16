import { pgTable, serial, varchar, date, time, text, timestamp } from "drizzle-orm/pg-core";

// Tabla "Cita" — ver Anexo D del informe (Modelo entidad-relación)
export const citas = pgTable("citas", {
  id: serial("id").primaryKey(),
  fecha: date("fecha", { mode: "string" }).notNull(),
  hora: time("hora", { precision: 0 }).notNull(),
  descripcion: varchar("descripcion", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Tabla "Medicamento" — ver Anexo D del informe (Modelo entidad-relación)
export const medicamentos = pgTable("medicamentos", {
  id: serial("id").primaryKey(),
  nombre: varchar("nombre", { length: 150 }).notNull(),
  horario: time("horario", { precision: 0 }).notNull(),
  frecuencia: varchar("frecuencia", { length: 100 }).notNull(),
  observaciones: text("observaciones"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type CitaRow = typeof citas.$inferSelect;
export type NuevaCitaRow = typeof citas.$inferInsert;
export type MedicamentoRow = typeof medicamentos.$inferSelect;
export type NuevoMedicamentoRow = typeof medicamentos.$inferInsert;
