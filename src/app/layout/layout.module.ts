import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutSettingsComponent } from './layout-settings/layout-settings.component';
import { MainComponent } from './main/main.component';
import { QuickSidebarComponent } from './quick-sidebar/quick-sidebar.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { TopHeaderComponent } from './top-header/top-header.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { RolesComponent } from '@app/roles/roles.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateRoleComponent } from '@app/roles/create-role/create-role.component';
import { EditRoleComponent } from '@app/roles/edit-role/edit-role.component';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UsersComponent } from '@app/users/users.component';
import { CreateUserComponent } from '@app/users/create-user/create-user.component';
import { EditUserComponent } from '@app/users/edit-user/edit-user.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

@NgModule({
  imports:
  [
    CommonModule,
    LayoutRoutingModule,
    NgxPaginationModule,
    NgxDatatableModule,
    ModalModule.forRoot(),
    FormsModule,
    AngularDateTimePickerModule,
    SharedModule
  ],

  declarations: [
    MainComponent,
    DashboardComponent,
    TopHeaderComponent,
    FooterComponent,
    QuickSidebarComponent,
    SideBarComponent,
    LayoutSettingsComponent,
    RolesComponent,
    CreateRoleComponent,
    EditRoleComponent,
    UsersComponent,
    CreateUserComponent,
    EditUserComponent
  ]
})
export class LayoutModule {}
