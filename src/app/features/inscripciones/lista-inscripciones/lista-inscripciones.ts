import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Inscripcion, PaginatedResponse } from '../../../core/models';

@Component({ selector: 'app-lista-inscripciones', standalone: false,
  templateUrl: './lista-inscripciones.html', styleUrl: './lista-inscripciones.scss' })
export class ListaInscripciones implements OnInit {
  data: PaginatedResponse<Inscripcion> | null = null;
  loading = true; estadoFiltro = ''; deleteId: number | null = null; showConfirm = false;

  constructor(private api: ApiService) {}
  ngOnInit() { this.load(); }

  load(page = 1) {
    this.loading = true;
    const params: any = { page };
    if (this.estadoFiltro) params['estado'] = this.estadoFiltro;
    this.api.getInscripciones(params).subscribe({ next: d => { this.data = d; this.loading = false; }, error: () => { this.loading = false; } });
  }

  confirmDelete(id: number) { this.deleteId = id; this.showConfirm = true; }
  doDelete() {
    if (!this.deleteId) return;
    this.api.deleteInscripcion(this.deleteId).subscribe(() => { this.showConfirm = false; this.deleteId = null; this.load(); });
  }

  cambiarEstado(id: number, estado: string) {
    this.api.updateInscripcion(id, { estado }).subscribe(() => this.load());
  }
}
