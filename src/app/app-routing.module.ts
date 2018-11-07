import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  { 
    path: '',
    loadChildren: '../app/layout/layout.module#LayoutModule'
  }
];

@NgModule({
 
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
