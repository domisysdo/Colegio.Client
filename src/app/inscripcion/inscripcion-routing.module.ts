import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { CreateEstudianteComponent } from './estudiante/create-estudiante/create-estudiante.component';
import { EditEstudianteComponent } from './estudiante/edit-estudiante/edit-estudiante.component';
import { GrupoComponent } from './grupo/grupo.component';
import { CreateGrupoComponent } from './grupo/create-grupo/create-grupo.component';
import { EditGrupoComponent } from './grupo/edit-grupo/edit-grupo.component';
import { ParentescoComponent } from './parentesco/parentesco.component';
import { CreateParentescoComponent } from './parentesco/create-parentesco/create-parentesco.component';
import { EditParentescoComponent } from './parentesco/edit-parentesco/edit-parentesco.component';
import { PeriodoComponent } from './periodo/periodo.component';
import { CreatePeriodoComponent } from './periodo/create-periodo/create-periodo.component';
import { EditPeriodoComponent } from './periodo/edit-periodo/edit-periodo.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { MateriaComponent } from './materia/materia.component';
import { CreateMateriaComponent } from './materia/create-materia/create-materia.component';
import { EditMateriaComponent } from './materia/edit-materia/edit-materia.component';

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
        path: 'inscripcion/estudiante/create-estudiante/:id',
        component: CreateEstudianteComponent
      },
      {
        path: 'inscripcion/grupo',
        component: GrupoComponent, canActivate: [AppRouteGuard]
      },
      {
        path: 'inscripcion/grupo/create-grupo',
        component: CreateGrupoComponent
      },
      {
        path: 'inscripcion/grupo/edit-grupo/:id',
        component: EditGrupoComponent
      },
      {
        path: 'inscripcion/parentesco',
        component: ParentescoComponent, canActivate: [AppRouteGuard]
      },
      {
        path: 'inscripcion/parentesco/create-parentesco',
        component: CreateParentescoComponent
      },
      {
        path: 'inscripcion/parentesco/edit-parentesco/:id',
        component: EditParentescoComponent
      },
      {
        path: 'inscripcion/periodo',
        component: PeriodoComponent, canActivate: [AppRouteGuard]
      },
      {
        path: 'inscripcion/periodo/create-periodo',
        component: CreatePeriodoComponent
      },
      {
        path: 'inscripcion/periodo/edit-periodo/:id',
        component: EditPeriodoComponent
      },
      {
        path: 'inscripcion/inscripcion',
        component: InscripcionComponent, canActivate: [AppRouteGuard]
      },
      {
        path: 'inscripcion/materia',
        component: MateriaComponent, canActivate: [AppRouteGuard]
      },
      {
        path: 'inscripcion/materia/create-materia',
        component: CreateMateriaComponent
      },
      {
        path: 'inscripcion/materia/edit-materia/:id',
        component: EditMateriaComponent
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
