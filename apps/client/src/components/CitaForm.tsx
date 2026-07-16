import { FormEvent, useState } from "react";
import type { NuevaCita } from "@agenda-medica/shared";

interface Props {
  onSubmit: (data: NuevaCita) => Promise<void>;
  initialValue?: NuevaCita;
  submitLabel?: string;
}

const empty: NuevaCita = { fecha: "", hora: "", descripcion: "" };

export function CitaForm({ onSubmit, initialValue = empty, submitLabel = "Registrar cita" }: Props) {
  const [form, setForm] = useState<NuevaCita>(initialValue);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onSubmit(form);
      setForm(empty);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo guardar la cita");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-banner">{error}</div>}
      <div className="form-field">
        <label htmlFor="fecha">Fecha</label>
        <input
          id="fecha"
          type="date"
          required
          value={form.fecha}
          onChange={(e) => setForm({ ...form, fecha: e.target.value })}
        />
      </div>
      <div className="form-field">
        <label htmlFor="hora">Hora</label>
        <input
          id="hora"
          type="time"
          required
          value={form.hora}
          onChange={(e) => setForm({ ...form, hora: e.target.value })}
        />
      </div>
      <div className="form-field">
        <label htmlFor="descripcion">Descripción</label>
        <textarea
          id="descripcion"
          required
          placeholder="Ej. Control cardiológico, Dr. Ramírez"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />
      </div>
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}
