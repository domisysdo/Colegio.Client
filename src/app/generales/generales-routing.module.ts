import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaisComponent } from './pais/pais.component';

import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { CreatePaisComponent } from './pais/create-pais/create-pais.component';
import { EditPaisComponent } from './pais/edit-pais/edit-pais.component';
import { ProvinciaComponent } from './provicia/provincia.component';
import { CreateProvinciaComponent } from './provicia/create-provincia/create-provincia.component';
import { EditProvinciaComponent } from './provicia/edit-provincia/edit-provincia.component';
import { MunicipioComponent } from './municipio/municipio.component';
import { EditMunicipioComponent } from './municipio/edit-municipio/edit-municipio.component';
import { CreateMunicipioComponent } from './municipio/create-municipio/create-municipio.component';
import { SectorComponent } from './sector/sector.component';
import { CreateSectorComponent } from './sector/create-sector/create-sector.component';
import { EditSectorComponent } from './sector/edit-sector/edit-sector-component';
import { TipoTelefonoComponent } from './tipo-telefono/tipo-telefono.component';
import { CreateTipoTelefonoComponent } from './tipo-telefono/create-tipo-telefono/create-tipo-telefono.component';
import { EditTipoTelefonoComponent } from './tipo-telefono/edit-tipo-telefono/edit-tipo-telefono.component';
import { TipoDireccionComponent } from './tipo-direccion/tipo-direccion.component';
import { CreateTipoDireccionComponent } from './tipo-direccion/create-tipo-direccion/create-tipo-direccion.component';
import { EditTipoDireccionComponent } from './tipo-direccion/edit-tipo-direccion/edit-tipo-direccion.component';
import { CreateTipoEmailComponent } from './tipo-email/create-tipo-email/create-tipo-email.component';
import { EditTipoEmailComponent } from './tipo-email/edit-tipo-email/edit-tipo-email.component';
import { TipoEmailComponent } from './tipo-email/tipo-email.component';

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
        },
        {
          path: 'generales/municipio',
          component: MunicipioComponent, canActivate: [AppRouteGuard]
        },
        {
          path: 'generales/municipio/create-municipio',
          component: CreateMunicipioComponent
        },
        {
          path: 'generales/municipio/edit-municipio/:id',
          component: EditMunicipioComponent
        },
        {
          path: 'generales/sector',
          component: SectorComponent, canActivate: [AppRouteGuard]
        },
        {
          path: 'generales/sector/create-sector',
          component: CreateSectorComponent
        },
        {
          path: 'generales/sector/edit-sector/:id',
          component: EditSectorComponent
        },
        {
          path: 'generales/tipo-telefono',
          component: TipoTelefonoComponent, canActivate: [AppRouteGuard]
        },
        {
          path: 'generales/tipo-telefono/create-tipo-telefono',
          component: CreateTipoTelefonoComponent
        },
        {
          path: 'generales/tipo-telefono/edit-tipo-telefono/:id',
          component: EditTipoTelefonoComponent
        },
        {
          path: 'generales/tipo-direccion',
          component: TipoDireccionComponent, canActivate: [AppRouteGuard]
        },
        {
          path: 'generales/tipo-direccion/create-tipo-direccion',
          component: CreateTipoDireccionComponent
        },
        {
          path: 'generales/tipo-direccion/edit-tipo-direccion/:id',
          component: EditTipoDireccionComponent
        },
        {
          path: 'generales/tipo-email',
          component: TipoEmailComponent, canActivate: [AppRouteGuard]
        },
        {
          path: 'generales/tipo-email/create-tipo-email',
          component: CreateTipoEmailComponent
        },
        {
          path: 'generales/tipo-email/edit-tipo-email/:id',
          component: EditTipoEmailComponent
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
