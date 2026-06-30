import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models';

@Component({
  selector: 'app-topbar',
  standalone: false,
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  @Output() menuToggle = new EventEmitter<void>();
  user: User | null;

  constructor(private auth: AuthService) {
    this.user = auth.getCurrentUser();
  }

  logout() { this.auth.logout(); }
}
