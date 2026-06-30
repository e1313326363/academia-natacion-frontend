import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @Input() open = false;
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }
}
