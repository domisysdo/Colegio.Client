import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { ProfesorComponent } from './profesor/profesor.component';
import { CreateProfesorComponent } from './profesor/create-profesor/create-profesor.component';

const routes: Routes = [
    { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
    {
      path: '',
      children: [
        {
          path: 'nomina/profesor',
          component: ProfesorComponent, canActivate: [AppRouteGuard]
        },
        {
          path: 'nomina/profesor/create-profesor',
          component: CreateProfesorComponent
        },
        {
          path: 'nomina/profesor/create-profesor/:id',
          component: CreateProfesorComponent
        }
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

  export class NominaRoutingModule { }
