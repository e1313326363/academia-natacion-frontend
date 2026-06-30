import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Clase, PaginatedResponse } from '../../../core/models';

@Component({ selector: 'app-lista-clases', standalone: false,
  templateUrl: './lista-clases.html', styleUrl: './lista-clases.scss' })
export class ListaClases implements OnInit {
  data: PaginatedResponse<Clase> | null = null;
  loading = true; deleteId: number | null = null; showConfirm = false;

  constructor(private api: ApiService) {}
  ngOnInit() { this.load(); }

  load(page = 1) {
    this.loading = true;
    this.api.getClases({ page }).subscribe({ next: d => { this.data = d; this.loading = false; }, error: () => { this.loading = false; } });
  }

  confirmDelete(id: number) { this.deleteId = id; this.showConfirm = true; }
  doDelete() {
    if (!this.deleteId) return;
    this.api.deleteClase(this.deleteId).subscribe(() => { this.showConfirm = false; this.deleteId = null; this.load(); });
  }
}
