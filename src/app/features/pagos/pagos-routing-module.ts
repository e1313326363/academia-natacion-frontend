import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPagos } from './lista-pagos/lista-pagos';
import { FormPago } from './form-pago/form-pago';

const routes: Routes = [
  { path: '', component: ListaPagos },
  { path: 'nuevo', component: FormPago },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class PagosRoutingModule {}
