// Tipos compartidos entre el cliente (React) y el servidor (Express),
// reflejando el modelo entidad-relación descrito en el Anexo D del informe.

export interface Cita {
  id: number;
  fecha: string; // formato ISO: YYYY-MM-DD
  hora: string; // formato HH:mm
  descripcion: string;
  createdAt: string;
}

export type NuevaCita = Omit<Cita, "id" | "createdAt">;

export interface Medicamento {
  id: number;
  nombre: string;
  horario: string; // HH:mm
  frecuencia: string; // ej: "Cada 8 horas", "Diario", "Semanal"
  observaciones: string | null;
  createdAt: string;
}

export type NuevoMedicamento = Omit<Medicamento, "id" | "createdAt">;

// Un recordatorio unifica citas y medicamentos próximos para el dashboard.
export interface Recordatorio {
  tipo: "cita" | "medicamento";
  id: number;
  titulo: string;
  fecha: string;
  hora: string;
  detalle: string;
}

export interface ApiError {
  message: string;
  issues?: unknown;
}
