import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { DashboardStats } from '../../../core/models';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  stats: DashboardStats | null = null;
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getDashboardStats().subscribe({
      next: s => { this.stats = s; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
