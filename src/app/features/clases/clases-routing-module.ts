import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaClases } from './lista-clases/lista-clases';
import { FormClase } from './form-clase/form-clase';

const routes: Routes = [
  { path: '', component: ListaClases },
  { path: 'nuevo', component: FormClase },
  { path: 'editar/:id', component: FormClase },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class ClasesRoutingModule {}
