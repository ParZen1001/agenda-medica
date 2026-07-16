import type {
  Cita,
  NuevaCita,
  Medicamento,
  NuevoMedicamento,
  Recordatorio,
} from "@agenda-medica/shared";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ message: "Error de red" }));
    throw new Error(body.message ?? `Error ${res.status}`);
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export const api = {
  citas: {
    listar: () => request<Cita[]>("/citas"),
    crear: (data: NuevaCita) =>
      request<Cita>("/citas", { method: "POST", body: JSON.stringify(data) }),
    actualizar: (id: number, data: Partial<NuevaCita>) =>
      request<Cita>(`/citas/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    eliminar: (id: number) => request<void>(`/citas/${id}`, { method: "DELETE" }),
  },
  medicamentos: {
    listar: () => request<Medicamento[]>("/medicamentos"),
    crear: (data: NuevoMedicamento) =>
      request<Medicamento>("/medicamentos", { method: "POST", body: JSON.stringify(data) }),
    actualizar: (id: number, data: Partial<NuevoMedicamento>) =>
      request<Medicamento>(`/medicamentos/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    eliminar: (id: number) => request<void>(`/medicamentos/${id}`, { method: "DELETE" }),
  },
  recordatorios: {
    listar: () => request<Recordatorio[]>("/recordatorios"),
  },
};
