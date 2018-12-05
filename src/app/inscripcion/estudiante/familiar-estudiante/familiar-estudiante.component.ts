import { OnInit, Component, Input, Injector, AfterViewChecked, AfterContentChecked } from '@angular/core';
import {
    FamiliarEstudianteDto, TelefonoFamiliarEstudianteDto,
    EmailFamiliarEstudianteDto, DireccionFamiliarEstudianteDto,
    ParentescoDto, ParentescoServiceProxy, ProfesionServiceProxy, ProfesionDto,
    NacionalidadDto, NacionalidadServiceProxy, TipoIdentificacionDto, TipoIdentificacionServiceProxy
} from '@shared/service-proxies/service-proxies';

import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalHelper } from '@shared/helpers/ModalHelper';
import { MessageHelper } from '@app/shared/MessageHelper';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';
import { AppComponentBase } from '@shared/app-component-base';
import { EMAIL_PATTERN } from '@shared/helpers/constantes-globales';
import { SexoArray } from '@app/inscripcion/shared/inscripcion-arrays';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, esDoLocale } from 'ngx-bootstrap';

@Component({
    selector: 'app-familiar-estudiante',
    templateUrl: './familiar-estudiante.component.html'
})
export class FamiliarEstudianteComponent extends AppComponentBase implements OnInit, AfterContentChecked {

    familiar: FamiliarEstudianteDto;
    parentescoSelect: any;
    telefonosFamiliar: TelefonoFamiliarEstudianteDto[] = [];
    emailsFamiliar: EmailFamiliarEstudianteDto[] = [];
    direccionesFamiliar: DireccionFamiliarEstudianteDto[] = [];
    parentescos: ParentescoDto[] = [];
    profesiones: ProfesionDto[] = [];
    nacionalidades: NacionalidadDto[] = [];
    tiposIdentificacion: TipoIdentificacionDto[] = [];
    listaVisualizacionFamiliares: FamiliarEstudianteDto[] = []
    modal: NgbModalRef;

    indexElementoSeleccionado = -1;
    emailPattern = EMAIL_PATTERN;
    sexo = SexoArray.Sexo;
    estadoCivil = SexoArray.EstadoCivil;
    ngxDatatableHelper = NgxDatatableHelper;

    @Input() familiares: FamiliarEstudianteDto[];

    constructor(
        injector: Injector,
        private _parentescoService: ParentescoServiceProxy,
        private _profesionService: ProfesionServiceProxy,
        private _nacionalidadService: NacionalidadServiceProxy,
        private _tipoIdentificacaionService: TipoIdentificacionServiceProxy,
        private localeService: BsLocaleService,
        private modalHelper: ModalHelper
    ) {
        super(injector)
    }

    ngOnInit(): void {

        this.obtenerParentescos();
        this.obtenerProfesiones();
        this.obtenerNacionalidades();
        this.obtenerTipoIdentificacion();
        this.obtenerValoresDefecto();
    }


    ngAfterContentChecked(): void {
        this.listaVisualizacionFamiliares = [...this.familiares];
    }

    obtenerParentescos() {

        this._parentescoService.getAllForSelect()
            .subscribe((result: ParentescoDto[]) => {
                this.parentescos = result;
            });
    }

    obtenerNacionalidades() {

        this._nacionalidadService.getAllForSelect()
            .subscribe((result: NacionalidadDto[]) => {
                this.nacionalidades = result;
            });
    }

    obtenerProfesiones() {

        this._profesionService.getAllForSelect()
            .subscribe((result: ProfesionDto[]) => {
                this.profesiones = result;
            });
    }

    obtenerTipoIdentificacion() {

        this._tipoIdentificacaionService.getAllForSelect()
            .subscribe((result: TipoIdentificacionDto[]) => {
                this.tiposIdentificacion = result;
            });
    }

    agregarFamiliar(content) {

        this.indexElementoSeleccionado = -1;
        this.familiar = new FamiliarEstudianteDto();
        this.modal = this.modalHelper.getLargeModal(content);
    }

    editarFamiliar(familiar: FamiliarEstudianteDto, content) {

        this.indexElementoSeleccionado = this.familiares.indexOf(familiar);
        this.familiar = JSON.parse(JSON.stringify(familiar));
        this.modal = this.modalHelper.getLargeModal(content);
    }

    registrarFamiliares() {

        if (!this.familiarExisteDetalle()) {

            // this.agregarRelaciones();
            // console.log(this.familiares);

            this.familiar.nombreCompleto = this.familiar.nombres + ' ' +
            this.familiar.primerApellido + ' ' + this.familiar.segundoApellido;

            this.familiar.parentescoNombre = this.parentescoSelect.descripcion;

            if (this.indexElementoSeleccionado >= 0) {
                this.familiares[this.indexElementoSeleccionado] = this.familiar;
            } else {
                this.familiares.push(this.familiar);
            }

            this.listaVisualizacionFamiliares = [...this.familiares];
            this.modal.close();
        }
    }

    familiarExisteDetalle(): boolean {
        console.log(this.familiares);
        for (const item of this.familiares) {
            if (this.familiares.indexOf(item) !== this.indexElementoSeleccionado &&
                item.identificador === this.familiar.identificador
            ) {
                MessageHelper.show('El familiar ya existe en el detalle', 'Ya existe');
                return true;
            }
        }
        return false;
    }

    // agregarRelaciones() {
    //     this.familiar.listaDirecciones = this.direccionesFamiliar;
    //     this.familiar.listaEmails = this.emailsFamiliar;
    //     this.familiar.listaTelefonos = this.telefonosFamiliar;
    // }

    onParentescoChange(event: any) {
        this.parentescoSelect = event;
    }

    obtenerValoresDefecto() {
        defineLocale('es', esDoLocale);
        this.localeService.use('es');
    }

    eliminarElementoLista(lista: any[], row) {
        console.log(lista);
        MessageHelper.confirm(
            'Se eliminará el elemento seleccionado',
            '¿Desea borrarlo?',
            () => {
                lista.splice(lista.indexOf(row), 1);
                this.listaVisualizacionFamiliares.splice(this.listaVisualizacionFamiliares.indexOf(row), 1);
            }
        );
    }
}
