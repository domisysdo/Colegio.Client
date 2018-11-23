import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisComponent } from './pais/pais.component';
import { CreatePaisComponent } from './pais/create-pais/create-pais.component';
import { EditPaisComponent } from './pais/edit-pais/edit-pais.component';
import { GeneralesRoutingModule } from './generales-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProvinciaComponent } from './provicia/provincia.component';
import { CreateProvinciaComponent } from './provicia/create-provincia/create-provincia.component';
import { EditProvinciaComponent } from './provicia/edit-provincia/edit-provincia.component';
import { EditMunicipioComponent } from './municipio/edit-municipio/edit-municipio.component';
import { MunicipioComponent } from './municipio/municipio.component';
import { CreateMunicipioComponent } from './municipio/create-municipio/create-municipio.component';
import { SectorComponent } from './sector/sector.component';
import { CreateSectorComponent } from './sector/create-sector/create-sector.component';
import { EditSectorComponent } from './sector/edit-sector/edit-sector-component';
import { TipoTelefonoComponent } from './tipo-telefono/tipo-telefono.component';
import { CreateTipoTelefonoComponent } from './tipo-telefono/create-tipo-telefono/create-tipo-telefono.component';
import { EditTipoTelefonoComponent } from './tipo-telefono/edit-tipo-telefono/edit-tipo-telefono.component';
import { CreateTipoDireccionComponent } from './tipo-direccion/create-tipo-direccion/create-tipo-direccion.component';
import { EditTipoDireccionComponent } from './tipo-direccion/edit-tipo-direccion/edit-tipo-direccion.component';
import { TipoDireccionComponent } from './tipo-direccion/tipo-direccion.component';

@NgModule({

    imports:
    [
        CommonModule,
        GeneralesRoutingModule,
        NgxPaginationModule,
        NgxDatatableModule,
        ModalModule.forRoot(),
        FormsModule,
        SharedModule,
        NgSelectModule
    ],

    declarations: [
        PaisComponent,
        CreatePaisComponent,
        EditPaisComponent,
        ProvinciaComponent,
        CreateProvinciaComponent,
        EditProvinciaComponent,
        MunicipioComponent,
        CreateMunicipioComponent,
        EditMunicipioComponent,
        SectorComponent,
        CreateSectorComponent,
        EditSectorComponent,
        TipoTelefonoComponent,
        CreateTipoTelefonoComponent,
        EditTipoTelefonoComponent,
        TipoDireccionComponent,
        CreateTipoDireccionComponent,
        EditTipoDireccionComponent
    ]
})
export class GeneralesModule {}
