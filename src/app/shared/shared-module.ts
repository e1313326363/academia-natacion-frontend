import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Topbar } from './components/topbar/topbar';
import { ConfirmDialog } from './components/confirm-dialog/confirm-dialog';

@NgModule({
  declarations: [
    Sidebar,
    Topbar,
    ConfirmDialog
  ],
  imports: [CommonModule, RouterModule],
  exports: [Sidebar, Topbar, ConfirmDialog],
})
export class SharedModule {}
