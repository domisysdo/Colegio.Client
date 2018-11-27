import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { InscripcionRoutingModule } from './inscripcion-routing.module';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { CreateEstudianteComponent } from './estudiante/create-estudiante/create-estudiante.component';
import { EditEstudianteComponent } from './estudiante/edit-estudiante/edit-estudiante.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { ScriptLoaderService } from '@app/_services/script-loader.service';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { CreateGrupoComponent } from './grupo/create-grupo/create-grupo.component';
import { GrupoComponent } from './grupo/grupo.component';
import { EditGrupoComponent } from './grupo/edit-grupo/edit-grupo.component';


@NgModule({

    imports:
        [
            CommonModule,
            InscripcionRoutingModule,
            NgxPaginationModule,
            NgxDatatableModule,
            ModalModule.forRoot(),
            FormsModule,
            SharedModule,
            NgSelectModule,
            DlDateTimePickerDateModule
        ],

    declarations: [
        EstudianteComponent,
        CreateEstudianteComponent,
        EditEstudianteComponent,
        GrupoComponent,
        CreateGrupoComponent,
        EditGrupoComponent
    ],
    providers: [
        ScriptLoaderService
    ]

})
export class InscripcionModule { }
