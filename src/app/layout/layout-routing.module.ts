import { Routes, RouterModule } from "@angular/router";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { NgModule } from "@angular/core";
import { MainComponent } from "./main/main.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RolesComponent } from "@app/roles/roles.component";

const routes: Routes = [
  { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
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
        component: RolesComponent, canActivate: [AppRouteGuard]
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

export class LayoutRoutingModule { }
