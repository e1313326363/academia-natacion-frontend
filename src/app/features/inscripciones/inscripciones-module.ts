import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InscripcionesRoutingModule } from './inscripciones-routing-module';
import { ListaInscripciones } from './lista-inscripciones/lista-inscripciones';
import { FormInscripcion } from './form-inscripcion/form-inscripcion';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [ListaInscripciones, FormInscripcion],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InscripcionesRoutingModule, SharedModule],
})
export class InscripcionesModule {}
