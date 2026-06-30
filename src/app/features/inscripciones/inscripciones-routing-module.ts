import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaInscripciones } from './lista-inscripciones/lista-inscripciones';
import { FormInscripcion } from './form-inscripcion/form-inscripcion';

const routes: Routes = [
  { path: '', component: ListaInscripciones },
  { path: 'nueva', component: FormInscripcion },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class InscripcionesRoutingModule {}
