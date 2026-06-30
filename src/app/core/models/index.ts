export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Nivel {
  id_nivel: number;
  nombre_nivel: string;
}

export interface Instructor {
  id_instructor: number;
  nombre: string;
  especialidad?: string;
  email?: string;
}

export interface Estudiante {
  id_estudiante: number;
  nombre: string;
  fecha_nacimiento: string;
  telefono?: string;
  email?: string;
}

export interface Clase {
  id_clase: number;
  nombre_clase: string;
  id_nivel: number;
  id_instructor: number;
  cupo: number;
  nivel?: Nivel;
  instructor?: Instructor;
}

export interface Inscripcion {
  id_inscripcion: number;
  id_estudiante: number;
  id_clase: number;
  fecha_inscripcion: string;
  estado: 'Activo' | 'Suspendido' | 'Baja';
  estudiante?: Estudiante;
  clase?: Clase;
}

export interface Pago {
  id_pago: number;
  id_inscripcion: number;
  monto: number;
  fecha_pago: string;
  metodo_pago: 'Efectivo' | 'Tarjeta' | 'Transferencia';
  estado: 'Pagado' | 'Pendiente' | 'Vencido';
  inscripcion?: Inscripcion;
}

export interface Asistencia {
  id_asistencia: number;
  id_inscripcion: number;
  fecha_clase: string;
  asistio: 'Si' | 'No';
  inscripcion?: Inscripcion;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface DashboardStats {
  total_estudiantes: number;
  inscripciones_activas: number;
  pagos_pendientes: number;
  pagos_mes: number;
  asistencias_hoy: number;
}
