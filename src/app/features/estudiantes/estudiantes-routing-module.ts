import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListaEstudiantes } from './lista-estudiantes/lista-estudiantes';
import { FormEstudiante } from './form-estudiante/form-estudiante';
const routes: Routes = [
  { path: '', component: ListaEstudiantes },
  { path: 'nuevo', component: FormEstudiante },
  { path: 'editar/:id', component: FormEstudiante },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudiantesRoutingModule { }
