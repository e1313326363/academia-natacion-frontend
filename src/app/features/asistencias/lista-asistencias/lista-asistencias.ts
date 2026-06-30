import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Asistencia, PaginatedResponse } from '../../../core/models';

@Component({ selector: 'app-lista-asistencias', standalone: false,
  templateUrl: './lista-asistencias.html', styleUrl: './lista-asistencias.scss' })
export class ListaAsistencias implements OnInit {
  data: PaginatedResponse<Asistencia> | null = null;
  loading = true; fechaFiltro = ''; deleteId: number | null = null; showConfirm = false;

  constructor(private api: ApiService) {}
  ngOnInit() { this.load(); }

  load(page = 1) {
    this.loading = true;
    const params: any = { page };
    if (this.fechaFiltro) params['fecha_clase'] = this.fechaFiltro;
    this.api.getAsistencias(params).subscribe({ next: d => { this.data = d; this.loading = false; }, error: () => { this.loading = false; } });
  }

  confirmDelete(id: number) { this.deleteId = id; this.showConfirm = true; }
  doDelete() {
    if (!this.deleteId) return;
    this.api.deleteAsistencia(this.deleteId).subscribe(() => { this.showConfirm = false; this.deleteId = null; this.load(); });
  }
}
