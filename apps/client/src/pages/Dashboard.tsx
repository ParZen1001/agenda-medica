import { useEffect, useState } from "react";
import type { Recordatorio } from "@agenda-medica/shared";
import { api } from "../api/client";

export function Dashboard() {
  const [recordatorios, setRecordatorios] = useState<Recordatorio[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.recordatorios
      .listar()
      .then(setRecordatorios)
      .catch((err) => setError(err.message));
  }, []);

  const totalCitas = recordatorios?.filter((r) => r.tipo === "cita").length ?? 0;
  const totalMedicamentos = recordatorios?.filter((r) => r.tipo === "medicamento").length ?? 0;

  return (
    <>
      <div className="page-header">
        <h1>Panel de recordatorios</h1>
        <p>
          Vista unificada de tus próximas citas médicas y horarios de medicamentos, para que
          nada se te pase por alto.
        </p>
      </div>

      <div className="stat-row">
        <div className="stat">
          <div className="stat__value">{totalCitas}</div>
          <div className="stat__label">Citas próximas</div>
        </div>
        <div className="stat">
          <div className="stat__value">{totalMedicamentos}</div>
          <div className="stat__label">Medicamentos activos</div>
        </div>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="card">
        <h2 style={{ marginBottom: 20 }}>Línea de tiempo</h2>
        {!recordatorios && !error && <p>Cargando recordatorios...</p>}
        {recordatorios && recordatorios.length === 0 && (
          <div className="empty-state">
            Aún no tienes citas ni medicamentos registrados. Agrégalos desde el menú lateral.
          </div>
        )}
        {recordatorios && recordatorios.length > 0 && (
          <div className="reminder-rail">
            {recordatorios.map((r) => (
              <div className="reminder-item" data-tipo={r.tipo} key={`${r.tipo}-${r.id}`}>
                <div className="reminder-item__meta">
                  <span className="time">{r.hora.slice(0, 5)}</span>
                  <span className="badge" data-tipo={r.tipo}>
                    {r.tipo === "cita" ? "Cita" : "Medicamento"}
                  </span>
                  <span className="time" style={{ color: "var(--ink-soft)", fontSize: "0.78rem" }}>
                    {r.fecha}
                  </span>
                </div>
                <div className="record-row__title">{r.titulo}</div>
                <div className="record-row__detail">{r.detalle}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
