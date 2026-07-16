import { useEffect, useState } from "react";
import type { Medicamento, NuevoMedicamento } from "@agenda-medica/shared";
import { api } from "../api/client";
import { MedicamentoForm } from "../components/MedicamentoForm";

export function Medicamentos() {
  const [medicamentos, setMedicamentos] = useState<Medicamento[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  function cargar() {
    api.medicamentos
      .listar()
      .then(setMedicamentos)
      .catch((err) => setError(err.message));
  }

  useEffect(cargar, []);

  async function crear(data: NuevoMedicamento) {
    const nuevo = await api.medicamentos.crear(data);
    setMedicamentos((prev) => [...(prev ?? []), nuevo]);
  }

  async function eliminar(id: number) {
    await api.medicamentos.eliminar(id);
    setMedicamentos((prev) => prev?.filter((m) => m.id !== id) ?? null);
  }

  return (
    <>
      <div className="page-header">
        <h1>Medicamentos</h1>
        <p>Registra tus medicamentos, horarios y frecuencia para recibir recordatorios oportunos.</p>
      </div>

      <div className="grid-two">
        <div className="card">
          <h2 style={{ marginBottom: 16 }}>Medicamentos registrados</h2>
          {error && <div className="error-banner">{error}</div>}
          {!medicamentos && !error && <p>Cargando medicamentos...</p>}
          {medicamentos && medicamentos.length === 0 && (
            <div className="empty-state">No hay medicamentos registrados todavía.</div>
          )}
          {medicamentos && medicamentos.length > 0 && (
            <div className="record-list">
              {medicamentos.map((m) => (
                <div className="record-row" key={m.id}>
                  <span className="record-row__time time">{m.horario.slice(0, 5)}</span>
                  <div className="record-row__body">
                    <div className="record-row__title">{m.nombre}</div>
                    <div className="record-row__detail">
                      {m.frecuencia}
                      {m.observaciones ? ` · ${m.observaciones}` : ""}
                    </div>
                  </div>
                  <button className="btn btn-ghost" onClick={() => eliminar(m.id)}>
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <h2 style={{ marginBottom: 16 }}>Nuevo medicamento</h2>
          <MedicamentoForm onSubmit={crear} />
        </div>
      </div>
    </>
  );
}
