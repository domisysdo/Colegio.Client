import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NominaRoutingModule } from './nomina-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProfesorComponent } from './profesor/profesor.component';
import { CreateProfesorComponent } from './profesor/create-profesor/create-profesor.component';
import { EditProfesorComponent } from './profesor/edit-profesor/edit-profesor.component';

@NgModule({

    imports:
    [
        CommonModule,
        NominaRoutingModule,
        NgxPaginationModule,
        NgxDatatableModule,
        ModalModule.forRoot(),
        FormsModule,
        SharedModule,
        NgSelectModule
    ],

    declarations: [
        ProfesorComponent,
        CreateProfesorComponent,
        EditProfesorComponent,
    ]
})
export class NominaModule {}
