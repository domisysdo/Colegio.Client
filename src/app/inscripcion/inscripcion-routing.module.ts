import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { CreateEstudianteComponent } from './estudiante/create-estudiante/create-estudiante.component';
import { EditEstudianteComponent } from './estudiante/edit-estudiante/edit-estudiante.component';

const routes: Routes = [
  { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
  {
    path: '',
    children: [
      {
        path: 'inscripcion/estudiante',
        component: EstudianteComponent, canActivate: [AppRouteGuard]
      },
      {
        path: 'inscripcion/estudiante/create-estudiante',
        component: CreateEstudianteComponent
      },
      {
        path: 'inscripcion/estudiante/edit-estudiante/:id',
        component: EditEstudianteComponent
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

export class InscripcionRoutingModule { }
