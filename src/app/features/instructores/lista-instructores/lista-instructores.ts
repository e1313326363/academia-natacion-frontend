import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Instructor, PaginatedResponse } from '../../../core/models';

@Component({ selector: 'app-lista-instructores', standalone: false,
  templateUrl: './lista-instructores.html', styleUrl: './lista-instructores.scss' })
export class ListaInstructores implements OnInit {
  data: PaginatedResponse<Instructor> | null = null;
  loading = true; search = ''; deleteId: number | null = null; showConfirm = false;

  constructor(private api: ApiService) {}
  ngOnInit() { this.load(); }

  load(page = 1) {
    this.loading = true;
    const params: any = { page };
    if (this.search) params['search'] = this.search;
    this.api.getInstructores(params).subscribe({
      next: d => { this.data = d; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  confirmDelete(id: number) { this.deleteId = id; this.showConfirm = true; }
  doDelete() {
    if (!this.deleteId) return;
    this.api.deleteInstructor(this.deleteId).subscribe(() => {
      this.showConfirm = false; this.deleteId = null; this.load();
    });
  }
}
