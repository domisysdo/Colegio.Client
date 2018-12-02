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
import { ScriptLoaderService } from '@app/_services/script-loader.service';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { CreateGrupoComponent } from './grupo/create-grupo/create-grupo.component';
import { GrupoComponent } from './grupo/grupo.component';
import { EditGrupoComponent } from './grupo/edit-grupo/edit-grupo.component';
import { EmailEstudianteComponent } from './estudiante/email-estudiante/email-estudiante.component';
import { TelefonoEstudianteComponent } from './estudiante/telefono-estudiante/telefono-estudiante.component';
import { DireccionEstudianteComponent } from './estudiante/direccion-estudiante/direccion-estudiante.component';
import { ParentescoComponent } from './parentesco/parentesco.component';
import { CreateParentescoComponent } from './parentesco/create-parentesco/create-parentesco.component';
import { EditParentescoComponent } from './parentesco/edit-parentesco/edit-parentesco.component';
import { FamiliarEstudianteComponent } from './estudiante/familiar-estudiante/familiar-estudiante.component';
import { PeriodoComponent } from './periodo/periodo.component';
import { CreatePeriodoComponent } from './periodo/create-periodo/create-periodo.component';
import { EditPeriodoComponent } from './periodo/edit-periodo/edit-periodo.component';
import { PadecimientoEstudianteComponent } from './estudiante/padecimiento-estudiante/padecimiento-estudiante.component';
import { ConsultaEstudianteComponent } from './estudiante/consulta-estudiante/consulta-estudiante.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { MateriaComponent } from './materia/materia.component';
import { CreateMateriaComponent } from './materia/create-materia/create-materia.component';
import { EditMateriaComponent } from './materia/edit-materia/edit-materia.component';

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
        EditGrupoComponent,
        EmailEstudianteComponent,
        TelefonoEstudianteComponent,
        DireccionEstudianteComponent,
        ParentescoComponent,
        CreateParentescoComponent,
        EditParentescoComponent,
        FamiliarEstudianteComponent,
        PeriodoComponent,
        CreatePeriodoComponent,
        EditPeriodoComponent,

        PadecimientoEstudianteComponent

        InscripcionComponent,
        MateriaComponent,
        CreateMateriaComponent,
        EditMateriaComponent,

    ],
    providers: [
        ScriptLoaderService
    ]

})
export class InscripcionModule { }
