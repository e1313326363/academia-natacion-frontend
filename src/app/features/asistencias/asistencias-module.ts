import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsistenciasRoutingModule } from './asistencias-routing-module';
import { ListaAsistencias } from './lista-asistencias/lista-asistencias';
import { FormAsistencia } from './form-asistencia/form-asistencia';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [ListaAsistencias, FormAsistencia],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AsistenciasRoutingModule, SharedModule],
})
export class AsistenciasModule {}
