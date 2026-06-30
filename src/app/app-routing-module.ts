import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { Layout } from './layout/layout';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule) },
  {
    path: '',
    component: Layout,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard',     loadChildren: () => import('./features/dashboard/dashboard-module').then(m => m.DashboardModule) },
      { path: 'estudiantes',   loadChildren: () => import('./features/estudiantes/estudiantes-module').then(m => m.EstudiantesModule) },
      { path: 'instructores',  loadChildren: () => import('./features/instructores/instructores-module').then(m => m.InstructoresModule) },
      { path: 'clases',        loadChildren: () => import('./features/clases/clases-module').then(m => m.ClasesModule) },
      { path: 'inscripciones', loadChildren: () => import('./features/inscripciones/inscripciones-module').then(m => m.InscripcionesModule) },
      { path: 'pagos',         loadChildren: () => import('./features/pagos/pagos-module').then(m => m.PagosModule) },
      { path: 'asistencias',   loadChildren: () => import('./features/asistencias/asistencias-module').then(m => m.AsistenciasModule) },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
