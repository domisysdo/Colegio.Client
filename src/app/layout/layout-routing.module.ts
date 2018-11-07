import { Routes, RouterModule } from "@angular/router";
import { AppRouteGuard } from "@shared/auth/auth-route-guard";
import { NgModule } from "@angular/core";
import { AppSessionService } from "@shared/session/app-session.service";
import { AppUrlService } from "@shared/nav/app-url.service";
import { AppAuthService } from "@shared/auth/app-auth.service";
import { MainComponent } from "./main/main.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  { path: '', redirectTo: '/app/dashboard', pathMatch: 'full' },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent, canActivate: [AppRouteGuard]
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
    RouterModule,
    
  ], 
    providers: [
        AppSessionService,
        AppUrlService,
        AppAuthService,
        AppRouteGuard
    ]

})

export class LayoutRoutingModule { }
