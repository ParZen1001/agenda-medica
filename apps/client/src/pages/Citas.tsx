import { useEffect, useState } from "react";
import type { Cita, NuevaCita } from "@agenda-medica/shared";
import { api } from "../api/client";
import { CitaForm } from "../components/CitaForm";

export function Citas() {
  const [citas, setCitas] = useState<Cita[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  function cargar() {
    api.citas
      .listar()
      .then(setCitas)
      .catch((err) => setError(err.message));
  }

  useEffect(cargar, []);

  async function crear(data: NuevaCita) {
    const nueva = await api.citas.crear(data);
    setCitas((prev) => [...(prev ?? []), nueva]);
  }

  async function eliminar(id: number) {
    await api.citas.eliminar(id);
    setCitas((prev) => prev?.filter((c) => c.id !== id) ?? null);
  }

  return (
    <>
      <div className="page-header">
        <h1>Citas médicas</h1>
        <p>Registra la fecha, hora y motivo de cada consulta para no volver a olvidarla.</p>
      </div>

      <div className="grid-two">
        <div className="card">
          <h2 style={{ marginBottom: 16 }}>Próximas citas</h2>
          {error && <div className="error-banner">{error}</div>}
          {!citas && !error && <p>Cargando citas...</p>}
          {citas && citas.length === 0 && (
            <div className="empty-state">No hay citas registradas todavía.</div>
          )}
          {citas && citas.length > 0 && (
            <div className="record-list">
              {citas.map((c) => (
                <div className="record-row" key={c.id}>
                  <span className="record-row__time time">
                    {c.fecha} · {c.hora.slice(0, 5)}
                  </span>
                  <div className="record-row__body">
                    <div className="record-row__title">{c.descripcion}</div>
                  </div>
                  <button className="btn btn-ghost" onClick={() => eliminar(c.id)}>
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <h2 style={{ marginBottom: 16 }}>Nueva cita</h2>
          <CitaForm onSubmit={crear} />
        </div>
      </div>
    </>
  );
}
