import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Estudiante, PaginatedResponse } from '../../../core/models';

@Component({
  selector: 'app-lista-estudiantes',
  standalone: false,
  templateUrl: './lista-estudiantes.html',
  styleUrl: './lista-estudiantes.scss',
})
export class ListaEstudiantes implements OnInit {
  data: PaginatedResponse<Estudiante> | null = null;
  loading = true;
  search = '';
  deleteId: number | null = null;
  showConfirm = false;
  deleteError = '';

  constructor(private api: ApiService) {}

  ngOnInit() { this.load(); }

  load(page = 1) {
    this.loading = true;
    const params: any = { page };
    if (this.search) params['search'] = this.search;
    this.api.getEstudiantes(params).subscribe({
      next: d => { this.data = d; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  confirmDelete(id: number) { this.deleteId = id; this.showConfirm = true; }

  doDelete() {
    if (!this.deleteId) return;
    this.deleteError = '';
    this.api.deleteEstudiante(this.deleteId).subscribe({
      next: () => { this.showConfirm = false; this.deleteId = null; this.load(); },
      error: err => {
        this.showConfirm = false;
        this.deleteError = err?.error?.message || 'No se puede eliminar: el registro tiene datos relacionados.';
        this.deleteId = null;
      }
    });
  }

  calcEdad(fecha: string): number {
    const hoy = new Date();
    const nac = new Date(fecha);
    let edad = hoy.getFullYear() - nac.getFullYear();
    const m = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
    return edad;
  }
}
