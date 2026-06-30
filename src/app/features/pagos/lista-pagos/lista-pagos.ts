import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Pago, PaginatedResponse } from '../../../core/models';

@Component({ selector: 'app-lista-pagos', standalone: false,
  templateUrl: './lista-pagos.html', styleUrl: './lista-pagos.scss' })
export class ListaPagos implements OnInit {
  data: PaginatedResponse<Pago> | null = null;
  loading = true; estadoFiltro = ''; deleteId: number | null = null; showConfirm = false;

  constructor(private api: ApiService) {}
  ngOnInit() { this.load(); }

  load(page = 1) {
    this.loading = true;
    const params: any = { page };
    if (this.estadoFiltro) params['estado'] = this.estadoFiltro;
    this.api.getPagos(params).subscribe({ next: d => { this.data = d; this.loading = false; }, error: () => { this.loading = false; } });
  }

  confirmDelete(id: number) { this.deleteId = id; this.showConfirm = true; }
  doDelete() {
    if (!this.deleteId) return;
    this.api.deletePago(this.deleteId).subscribe(() => { this.showConfirm = false; this.deleteId = null; this.load(); });
  }
}
