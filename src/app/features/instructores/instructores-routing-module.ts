import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaInstructores } from './lista-instructores/lista-instructores';
import { FormInstructor } from './form-instructor/form-instructor';

const routes: Routes = [
  { path: '', component: ListaInstructores },
  { path: 'nuevo', component: FormInstructor },
  { path: 'editar/:id', component: FormInstructor },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class InstructoresRoutingModule {}
