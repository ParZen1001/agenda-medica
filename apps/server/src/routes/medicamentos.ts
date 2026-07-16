import { Router } from "express";
import { eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { medicamentos } from "../db/schema.js";
import { medicamentoSchema } from "../validation.js";

export const medicamentosRouter = Router();

medicamentosRouter.get("/", async (_req, res, next) => {
  try {
    const registros = await db.select().from(medicamentos).orderBy(medicamentos.horario);
    res.json(registros);
  } catch (error) {
    next(error);
  }
});

medicamentosRouter.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const [registro] = await db.select().from(medicamentos).where(eq(medicamentos.id, id));
    if (!registro) return res.status(404).json({ message: "Medicamento no encontrado" });
    res.json(registro);
  } catch (error) {
    next(error);
  }
});

medicamentosRouter.post("/", async (req, res, next) => {
  const parsed = medicamentoSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Datos inválidos", issues: parsed.error.flatten() });
  }
  try {
    const [creado] = await db.insert(medicamentos).values(parsed.data).returning();
    res.status(201).json(creado);
  } catch (error) {
    next(error);
  }
});

medicamentosRouter.put("/:id", async (req, res, next) => {
  const parsed = medicamentoSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Datos inválidos", issues: parsed.error.flatten() });
  }
  try {
    const id = Number(req.params.id);
    const [actualizado] = await db
      .update(medicamentos)
      .set(parsed.data)
      .where(eq(medicamentos.id, id))
      .returning();
    if (!actualizado) return res.status(404).json({ message: "Medicamento no encontrado" });
    res.json(actualizado);
  } catch (error) {
    next(error);
  }
});

medicamentosRouter.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const [eliminado] = await db.delete(medicamentos).where(eq(medicamentos.id, id)).returning();
    if (!eliminado) return res.status(404).json({ message: "Medicamento no encontrado" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
