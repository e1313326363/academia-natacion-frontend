import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Asistencia, Clase, DashboardStats, Estudiante,
  Inscripcion, Instructor, Nivel, PaginatedResponse, Pago
} from '../models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ── Dashboard ──────────────────────────────────────────────
  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.url}/dashboard/stats`);
  }

  // ── Niveles ────────────────────────────────────────────────
  getNiveles(): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(`${this.url}/niveles`);
  }
  createNivel(data: Partial<Nivel>): Observable<Nivel> {
    return this.http.post<Nivel>(`${this.url}/niveles`, data);
  }
  updateNivel(id: number, data: Partial<Nivel>): Observable<Nivel> {
    return this.http.put<Nivel>(`${this.url}/niveles/${id}`, data);
  }
  deleteNivel(id: number): Observable<any> {
    return this.http.delete(`${this.url}/niveles/${id}`);
  }

  // ── Instructores ───────────────────────────────────────────
  getInstructores(params?: any): Observable<PaginatedResponse<Instructor>> {
    return this.http.get<PaginatedResponse<Instructor>>(`${this.url}/instructores`, { params });
  }
  getInstructor(id: number): Observable<Instructor> {
    return this.http.get<Instructor>(`${this.url}/instructores/${id}`);
  }
  createInstructor(data: Partial<Instructor>): Observable<Instructor> {
    return this.http.post<Instructor>(`${this.url}/instructores`, data);
  }
  updateInstructor(id: number, data: Partial<Instructor>): Observable<Instructor> {
    return this.http.put<Instructor>(`${this.url}/instructores/${id}`, data);
  }
  deleteInstructor(id: number): Observable<any> {
    return this.http.delete(`${this.url}/instructores/${id}`);
  }

  // ── Estudiantes ────────────────────────────────────────────
  getEstudiantes(params?: any): Observable<PaginatedResponse<Estudiante>> {
    return this.http.get<PaginatedResponse<Estudiante>>(`${this.url}/estudiantes`, { params });
  }
  getEstudiante(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.url}/estudiantes/${id}`);
  }
  createEstudiante(data: Partial<Estudiante>): Observable<Estudiante> {
    return this.http.post<Estudiante>(`${this.url}/estudiantes`, data);
  }
  updateEstudiante(id: number, data: Partial<Estudiante>): Observable<Estudiante> {
    return this.http.put<Estudiante>(`${this.url}/estudiantes/${id}`, data);
  }
  deleteEstudiante(id: number): Observable<any> {
    return this.http.delete(`${this.url}/estudiantes/${id}`);
  }

  // ── Clases ─────────────────────────────────────────────────
  getClases(params?: any): Observable<PaginatedResponse<Clase>> {
    return this.http.get<PaginatedResponse<Clase>>(`${this.url}/clases`, { params });
  }
  getClase(id: number): Observable<Clase> {
    return this.http.get<Clase>(`${this.url}/clases/${id}`);
  }
  createClase(data: Partial<Clase>): Observable<Clase> {
    return this.http.post<Clase>(`${this.url}/clases`, data);
  }
  updateClase(id: number, data: Partial<Clase>): Observable<Clase> {
    return this.http.put<Clase>(`${this.url}/clases/${id}`, data);
  }
  deleteClase(id: number): Observable<any> {
    return this.http.delete(`${this.url}/clases/${id}`);
  }

  // ── Inscripciones ──────────────────────────────────────────
  getInscripciones(params?: any): Observable<PaginatedResponse<Inscripcion>> {
    return this.http.get<PaginatedResponse<Inscripcion>>(`${this.url}/inscripciones`, { params });
  }
  getInscripcion(id: number): Observable<Inscripcion> {
    return this.http.get<Inscripcion>(`${this.url}/inscripciones/${id}`);
  }
  createInscripcion(data: Partial<Inscripcion>): Observable<Inscripcion> {
    return this.http.post<Inscripcion>(`${this.url}/inscripciones`, data);
  }
  updateInscripcion(id: number, data: any): Observable<Inscripcion> {
    return this.http.put<Inscripcion>(`${this.url}/inscripciones/${id}`, data);
  }
  deleteInscripcion(id: number): Observable<any> {
    return this.http.delete(`${this.url}/inscripciones/${id}`);
  }

  // ── Pagos ──────────────────────────────────────────────────
  getPagos(params?: any): Observable<PaginatedResponse<Pago>> {
    return this.http.get<PaginatedResponse<Pago>>(`${this.url}/pagos`, { params });
  }
  getPago(id: number): Observable<Pago> {
    return this.http.get<Pago>(`${this.url}/pagos/${id}`);
  }
  createPago(data: Partial<Pago>): Observable<Pago> {
    return this.http.post<Pago>(`${this.url}/pagos`, data);
  }
  updatePago(id: number, data: any): Observable<Pago> {
    return this.http.put<Pago>(`${this.url}/pagos/${id}`, data);
  }
  deletePago(id: number): Observable<any> {
    return this.http.delete(`${this.url}/pagos/${id}`);
  }

  // ── Asistencias ────────────────────────────────────────────
  getAsistencias(params?: any): Observable<PaginatedResponse<Asistencia>> {
    return this.http.get<PaginatedResponse<Asistencia>>(`${this.url}/asistencias`, { params });
  }
  createAsistencia(data: Partial<Asistencia>): Observable<Asistencia> {
    return this.http.post<Asistencia>(`${this.url}/asistencias`, data);
  }
  updateAsistencia(id: number, data: any): Observable<Asistencia> {
    return this.http.put<Asistencia>(`${this.url}/asistencias/${id}`, data);
  }
  deleteAsistencia(id: number): Observable<any> {
    return this.http.delete(`${this.url}/asistencias/${id}`);
  }
}
