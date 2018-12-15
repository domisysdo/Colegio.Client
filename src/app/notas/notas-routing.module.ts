import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { CreateMetodoEvaluacionComponent } from './metodo-evaluacion/create-metodo-evaluacion/create-metodo-evaluacion.component';
import { MetodoEvaluacionComponent } from './metodo-evaluacion/metodo-evaluacion.component';
import { CalificacionComponent } from './calificacion/calificacion.component';
import { CreateCalificacionComponent } from './calificacion/create-calificacion/create-calificacion.component';

const routes: Routes = [
  { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: 'notas/metodo-evaluacion',
        component: MetodoEvaluacionComponent, canActivate: [AppRouteGuard]
      },
      {
        path: 'notas/metodo-evaluacion/create-metodo-evaluacion',
        component: CreateMetodoEvaluacionComponent
      },
      {
        path: 'notas/metodo-evaluacion/create-metodo-evaluacion/:id',
        component: CreateMetodoEvaluacionComponent
      },

      {
        path: 'notas/calificacion',
        component: CalificacionComponent, canActivate: [AppRouteGuard]
      },
      {
        path: 'notas/calificacion/create-calificacion',
        component: CreateCalificacionComponent
      },
      {
        path: 'notas/calificacion/create-calificacion/:id',
        component: CreateCalificacionComponent
      },
    ]
  }
];

@NgModule({
  declarations: [],

  imports: [
    RouterModule.forChild(routes),
  ],

  exports: [
    RouterModule
  ]

})

export class NotasRoutingModule { }
