import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleComponent } from '@app/roles/create-role/create-role.component';
import { EditRoleComponent } from '@app/roles/edit-role/edit-role.component';
import { UsersComponent } from '@app/users/users.component';
import { CreateUserComponent } from '@app/users/create-user/create-user.component';
import { EditUserComponent } from '@app/users/edit-user/edit-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    loadChildren: '../../app/generales/generales.module#GeneralesModule',
  },
  {
    path: '',
    component: MainComponent,
    loadChildren: '../../app/inscripcion/inscripcion.module#InscripcionModule',
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent, canActivate: [AppRouteGuard]
      },
      {
        path: 'roles',
        component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard]
      },
      {
        path: 'roles/create-role',
        component: CreateRoleComponent
      },
      {
        path: 'roles/edit-role/:id',
        component: EditRoleComponent
      },
      {
        path: 'users',
        component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard]
      },
      {
        path: 'users/create-user',
        component: CreateUserComponent
      },
      {
        path: 'users/edit-user/:id',
        component: EditUserComponent
      }
    ]
  }
];


@NgModule({
  declarations: [],

  imports: [
    RouterModule.forChild(routes)
  ],

  exports: [
    RouterModule
  ]

})

export class LayoutRoutingModule { }
