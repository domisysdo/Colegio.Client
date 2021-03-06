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
import { TipoEmailComponent } from './tipo-email/tipo-email.component';
import { EditTipoEmailComponent } from './tipo-email/edit-tipo-email/edit-tipo-email.component';
import { CreateTipoEmailComponent } from './tipo-email/create-tipo-email/create-tipo-email.component';
import { CreateProfesionComponent } from './profesion/create-profesion/create-profesion.component';
import { EditProfesionComponent } from './profesion/edit-profesion/edit-profesion.component';
import { ProfesionComponent } from './profesion/profesion.component';
import { CreateTipoIdentificacionComponent } from './tipo-identificacion/create-tipo-identificacion/create-tipo-identificacion.component';
import { EditTipoIdentificacionComponent } from './tipo-identificacion/edit-tipo-identificacion/edit-tipo-identificacion.component';
import { TipoIdentificacionComponent } from './tipo-identificacion/tipo-identificacion.component';
import { CreateTipoIncidenciaComponent } from './tipo-incidencia/create-tipo-incidencia/create-tipo-incidencia.component';
import { TipoIncidenciaComponent } from './tipo-incidencia/tipo-incidencia.component';
import { CreateTipoPadecimientoComponent } from './tipo-padecimiento/create-tipo-padecimiento/create-tipo-padecimiento.component';
import { EditTipoPadecimientoComponent } from './tipo-padecimiento/edit-tipo-padecimiento/edit-tipo-padecimientocomponent';
import { TipoPadecimientoComponent } from './tipo-padecimiento/tipo-padecimiento.component';
import { IncidenciaEstudianteComponent } from './incidencia-estudiante/incidencia-estudiante.component';
import { CreateIncidenciaEstudianteComponent } from './incidencia-estudiante/create-incidencia/create-incidencia-estudiante.component';
import { CreateNacionalidadComponent } from './nacionalidad/create-nacionalidad/create-nacionalidad.component';
import { EditNacionalidadComponent } from './nacionalidad/edit-nacionalidad/edit-nacionalidad.component';
import { NacionalidadComponent } from './nacionalidad/nacionalidad.component';
import { CreateAulaComponent } from './aula/create-aula/create-aula.component';
import { EditAulaComponent } from './aula/edit-aula/edit-aula.component';
import { AulaComponent } from './aula/aula.component';

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
        EditTipoDireccionComponent,
        CreateTipoEmailComponent,
        EditTipoEmailComponent,
        TipoEmailComponent,
        ProfesionComponent,
        CreateProfesionComponent,
        EditProfesionComponent,
        ProfesionComponent,
        CreateTipoIdentificacionComponent,
        EditTipoIdentificacionComponent,
        TipoIdentificacionComponent,
        CreateTipoIncidenciaComponent,
        TipoIncidenciaComponent,
        CreateTipoPadecimientoComponent,
        EditTipoPadecimientoComponent,
        TipoPadecimientoComponent,
        IncidenciaEstudianteComponent,
        CreateIncidenciaEstudianteComponent,
        TipoPadecimientoComponent,
        CreateNacionalidadComponent,
        EditNacionalidadComponent,
        NacionalidadComponent,
        CreateAulaComponent,
        EditAulaComponent,
        AulaComponent
    ]
})
export class GeneralesModule {}
