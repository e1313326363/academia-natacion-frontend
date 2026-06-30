import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAsistencias } from './lista-asistencias/lista-asistencias';
import { FormAsistencia } from './form-asistencia/form-asistencia';

const routes: Routes = [
  { path: '', component: ListaAsistencias },
  { path: 'nueva', component: FormAsistencia },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class AsistenciasRoutingModule {}
