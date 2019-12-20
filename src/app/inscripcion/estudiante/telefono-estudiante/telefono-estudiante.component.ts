import { OnInit, Component, Input, Injector, AfterContentChecked } from '@angular/core';
import {
    TelefonoEstudianteDto,
    TipoTelefonoServiceProxy,
    TipoTelefonoDto
} from '@shared/service-proxies/service-proxies';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalHelper } from '@shared/helpers/ModalHelper';
import { MessageHelper } from '@app/shared/MessageHelper';
import { MascarasConstantes } from '@shared/helpers/mascaras-constantes';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'app-telefono-estudiante',
    templateUrl: './telefono-estudiante.component.html'
})
export class TelefonoEstudianteComponent extends AppComponentBase implements OnInit, AfterContentChecked {

    telefono: TelefonoEstudianteDto;
    telefonoSelect: any;
    tiposTelefono: TipoTelefonoDto[];
    listaVisualizacionTelefonos: TelefonoEstudianteDto[] = [];
    modal: NgbModalRef;

    maskTelefono = MascarasConstantes;
    ngxDatatableHelper = NgxDatatableHelper;
    indexElementoSeleccionado = -1;

    @Input() telefonos: TelefonoEstudianteDto[] = [];

    constructor(
        injector: Injector,
        private _tipoTelefonoService: TipoTelefonoServiceProxy,
        private modalHelper: ModalHelper
    ) {
        super(injector)
    }

    ngOnInit(): void {
        this.obtenerTiposTelefono();
    }

    ngAfterContentChecked(): void {
        this.listaVisualizacionTelefonos = [...this.telefonos];
    }

    obtenerTiposTelefono() {
        this._tipoTelefonoService.getAllForSelect()
            .subscribe((result: TipoTelefonoDto[]) => {
                this.tiposTelefono = result;
            });
    }

    agregarTelefono(content) {
        this.indexElementoSeleccionado = -1;
        this.telefono = new TelefonoEstudianteDto();
        this.modal = this.modalHelper.getMediumModal(content);
    }

    editarTelefono(telefono: TelefonoEstudianteDto, content) {
        this.indexElementoSeleccionado = this.telefonos.indexOf(telefono);
        this.telefono = JSON.parse(JSON.stringify(telefono));
        this.modal = this.modalHelper.getMediumModal(content);
    }

    registrarTelefonos() {
        if (!this.telefonoExisteDetalle()) {

            if (this.telefonoSelect) {
                this.telefono.tipoTelefonoNombre = this.telefonoSelect.descripcion;
            }

            if (this.indexElementoSeleccionado >= 0) {
                this.telefonos[this.indexElementoSeleccionado] = this.telefono;
            } else {
                this.telefonos.push(this.telefono);
            }

            this.listaVisualizacionTelefonos = [...this.telefonos];
            this.modal.close();
        }
    }

    telefonoExisteDetalle(): boolean {
        for (const item of this.telefonos) {
            if (this.telefonos.indexOf(item) !== this.indexElementoSeleccionado &&
                item.numero === this.telefono.numero) {
                MessageHelper.show('El télefono ya existe en el detalle', 'Ya existe');
                return true;
            }
        }
        return false;
    }

    onTipoTelefonoChange(event: any) {
        this.telefonoSelect = event;
    }

    eliminarElementoLista(lista: any[], row) {
        console.log(lista);
        MessageHelper.confirm(
            'Se eliminará el elemento seleccionado',
            '¿Desea borrarlo?',
            () => {
                lista.splice(lista.indexOf(row), 1);
                this.listaVisualizacionTelefonos.splice(this.listaVisualizacionTelefonos.indexOf(row), 1);
            }
        );
    }
}
