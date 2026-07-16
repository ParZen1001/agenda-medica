import { Router } from "express";
import { gte } from "drizzle-orm";
import { db } from "../db/index.js";
import { citas, medicamentos } from "../db/schema.js";
import type { Recordatorio } from "@agenda-medica/shared";

export const recordatoriosRouter = Router();

// GET /api/recordatorios — unifica citas y medicamentos próximos para el
// dashboard, apoyando la adherencia terapéutica (2.2.11) y la asistencia
// a consultas (2.2.12).
recordatoriosRouter.get("/", async (_req, res, next) => {
  try {
    const hoy = new Date().toISOString().slice(0, 10);

    const [proximasCitas, todosMedicamentos] = await Promise.all([
      db.select().from(citas).where(gte(citas.fecha, hoy)),
      db.select().from(medicamentos),
    ]);

    const recordatorios: Recordatorio[] = [
      ...proximasCitas.map((c) => ({
        tipo: "cita" as const,
        id: c.id,
        titulo: "Cita médica",
        fecha: c.fecha,
        hora: c.hora,
        detalle: c.descripcion,
      })),
      ...todosMedicamentos.map((m) => ({
        tipo: "medicamento" as const,
        id: m.id,
        titulo: m.nombre,
        fecha: hoy,
        hora: m.horario,
        detalle: `${m.frecuencia}${m.observaciones ? " · " + m.observaciones : ""}`,
      })),
    ].sort((a, b) => `${a.fecha}${a.hora}`.localeCompare(`${b.fecha}${b.hora}`));

    res.json(recordatorios);
  } catch (error) {
    next(error);
  }
});
