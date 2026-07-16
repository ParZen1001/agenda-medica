import "dotenv/config";
import express from "express";
import cors from "cors";
import { citasRouter } from "./routes/citas.js";
import { medicamentosRouter } from "./routes/medicamentos.js";
import { recordatoriosRouter } from "./routes/recordatorios.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const port = Number(process.env.PORT ?? 4000);

app.use(cors({ origin: process.env.CLIENT_ORIGIN ?? "http://localhost:5173" }));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "agenda-medica-server" });
});

app.use("/api/citas", citasRouter);
app.use("/api/medicamentos", medicamentosRouter);
app.use("/api/recordatorios", recordatoriosRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Agenda Médica API escuchando en http://localhost:${port}`);
});
