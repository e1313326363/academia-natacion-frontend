import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClasesRoutingModule } from './clases-routing-module';
import { ListaClases } from './lista-clases/lista-clases';
import { FormClase } from './form-clase/form-clase';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [ListaClases, FormClase],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ClasesRoutingModule, SharedModule],
})
export class ClasesModule {}
