import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { NotasRoutingModule } from './notas-routing.module';
import { ScriptLoaderService } from '@app/_services/script-loader.service';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { CreateMetodoEvaluacionComponent } from './metodo-evaluacion/create-metodo-evaluacion/create-metodo-evaluacion.component';
import { MetodoEvaluacionComponent } from './metodo-evaluacion/metodo-evaluacion.component';

@NgModule({

    imports:
        [
            CommonModule,
            NotasRoutingModule,
            NgxPaginationModule,
            NgxDatatableModule,
            ModalModule.forRoot(),
            FormsModule,
            SharedModule,
            NgSelectModule,
            DlDateTimePickerDateModule
        ],

    declarations: [
        CreateMetodoEvaluacionComponent,
        MetodoEvaluacionComponent
    ],
    providers: [
        ScriptLoaderService
    ]

})
export class NotasModule { }
