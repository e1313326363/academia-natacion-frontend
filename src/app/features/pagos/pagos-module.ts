import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagosRoutingModule } from './pagos-routing-module';
import { ListaPagos } from './lista-pagos/lista-pagos';
import { FormPago } from './form-pago/form-pago';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [ListaPagos, FormPago],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PagosRoutingModule, SharedModule],
})
export class PagosModule {}
