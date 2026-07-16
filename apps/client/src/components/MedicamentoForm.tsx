import { FormEvent, useState } from "react";
import type { NuevoMedicamento } from "@agenda-medica/shared";

interface Props {
  onSubmit: (data: NuevoMedicamento) => Promise<void>;
  initialValue?: NuevoMedicamento;
  submitLabel?: string;
}

const empty: NuevoMedicamento = { nombre: "", horario: "", frecuencia: "", observaciones: "" };

export function MedicamentoForm({
  onSubmit,
  initialValue = empty,
  submitLabel = "Registrar medicamento",
}: Props) {
  const [form, setForm] = useState<NuevoMedicamento>(initialValue);
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
      setError(err instanceof Error ? err.message : "No se pudo guardar el medicamento");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-banner">{error}</div>}
      <div className="form-field">
        <label htmlFor="nombre">Nombre del medicamento</label>
        <input
          id="nombre"
          required
          placeholder="Ej. Losartán 50mg"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
      </div>
      <div className="form-field">
        <label htmlFor="horario">Horario</label>
        <input
          id="horario"
          type="time"
          required
          value={form.horario}
          onChange={(e) => setForm({ ...form, horario: e.target.value })}
        />
      </div>
      <div className="form-field">
        <label htmlFor="frecuencia">Frecuencia</label>
        <input
          id="frecuencia"
          required
          placeholder="Ej. Cada 8 horas, Diario"
          value={form.frecuencia}
          onChange={(e) => setForm({ ...form, frecuencia: e.target.value })}
        />
      </div>
      <div className="form-field">
        <label htmlFor="observaciones">Observaciones</label>
        <textarea
          id="observaciones"
          placeholder="Ej. Tomar con alimentos"
          value={form.observaciones ?? ""}
          onChange={(e) => setForm({ ...form, observaciones: e.target.value })}
        />
      </div>
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}
