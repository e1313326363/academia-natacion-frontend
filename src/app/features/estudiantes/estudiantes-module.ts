import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EstudiantesRoutingModule } from './estudiantes-routing-module';
import { ListaEstudiantes } from './lista-estudiantes/lista-estudiantes';
import { FormEstudiante } from './form-estudiante/form-estudiante';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [ListaEstudiantes, FormEstudiante],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, EstudiantesRoutingModule, SharedModule],
})
export class EstudiantesModule {}
