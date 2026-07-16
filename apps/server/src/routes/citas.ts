import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { citas } from "../db/schema.js";
import { citaSchema } from "../validation.js";

export const citasRouter = Router();

// GET /api/citas — Consultar información (2.5 API REST)
citasRouter.get("/", async (_req, res, next) => {
  try {
    const registros = await db.select().from(citas).orderBy(citas.fecha, citas.hora);
    res.json(registros);
  } catch (error) {
    next(error);
  }
});

citasRouter.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const [registro] = await db.select().from(citas).where(eq(citas.id, id));
    if (!registro) return res.status(404).json({ message: "Cita no encontrada" });
    res.json(registro);
  } catch (error) {
    next(error);
  }
});

// POST /api/citas — Registrar información
citasRouter.post("/", async (req, res, next) => {
  const parsed = citaSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Datos inválidos", issues: parsed.error.flatten() });
  }
  try {
    const [creada] = await db.insert(citas).values(parsed.data).returning();
    res.status(201).json(creada);
  } catch (error) {
    next(error);
  }
});

// PUT /api/citas/:id — Actualizar información
citasRouter.put("/:id", async (req, res, next) => {
  const parsed = citaSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Datos inválidos", issues: parsed.error.flatten() });
  }
  try {
    const id = Number(req.params.id);
    const [actualizada] = await db
      .update(citas)
      .set(parsed.data)
      .where(eq(citas.id, id))
      .returning();
    if (!actualizada) return res.status(404).json({ message: "Cita no encontrada" });
    res.json(actualizada);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/citas/:id — Eliminar información
citasRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const [eliminada] = await db.delete(citas).where(eq(citas.id, id)).returning();
    if (!eliminada) return res.status(404).json({ message: "Cita no encontrada" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
