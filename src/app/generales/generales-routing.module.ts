import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaisComponent } from './pais/pais.component';

import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { CreatePaisComponent } from './pais/create-pais/create-pais.component';
import { EditPaisComponent } from './pais/edit-pais/edit-pais.component';
import { ProvinciaComponent } from './provicia/provincia.component';
import { CreateProvinciaComponent } from './provicia/create-provincia/create-provincia.component';
import { EditProvinciaComponent } from './provicia/edit-provincia/edit-provincia.component';

const routes: Routes = [
    { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
    {
      path: '',
      children: [
        {
          path: 'generales/pais',
          component: PaisComponent, canActivate: [AppRouteGuard]
        },
        {
          path: 'generales/pais/create-pais',
          component: CreatePaisComponent
        },
        {
          path: 'generales/pais/edit-pais/:id',
          component: EditPaisComponent
        },
        {
          path: 'generales/provincia',
          component: ProvinciaComponent, canActivate: [AppRouteGuard]
        },
        {
          path: 'generales/provincia/create-provincia',
          component: CreateProvinciaComponent
        },
        {
          path: 'generales/provincia/edit-provincia/:id',
          component: EditProvinciaComponent
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

  export class GeneralesRoutingModule { }
