import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { CreateMetodoEvaluacionComponent } from './metodo-evaluacion/create-metodo-evaluacion/create-metodo-evaluacion.component';
import { MetodoEvaluacionComponent } from './metodo-evaluacion/metodo-evaluacion.component';

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
