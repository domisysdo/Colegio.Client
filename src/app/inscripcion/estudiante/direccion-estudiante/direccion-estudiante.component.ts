import { OnInit, Component, Input, Injector } from '@angular/core';
import {
    DireccionEstudianteDto,
    TipoDireccionServiceProxy,
    TipoDireccionDto,
    SectorServiceProxy,
    SectorDto
} from '@shared/service-proxies/service-proxies';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalHelper } from '@shared/helpers/ModalHelper';
import { MessageHelper } from '@app/shared/MessageHelper';
import { MascarasConstantes } from '@shared/helpers/mascaras-constantes';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';
import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'app-direccion-estudiante',
    templateUrl: './direccion-estudiante.component.html'
})
export class DireccionEstudianteComponent extends AppComponentBase implements OnInit {

    direccion: any;
    direccionSelect: any;
    sectorSelect: any;
    tiposDireccion: TipoDireccionDto[];
    sectores: SectorDto[];
    listaVisualizacionDireccion: DireccionEstudianteDto[] = [];

    maskDireccion = MascarasConstantes;
    ngxDatatableHelper = NgxDatatableHelper;
    indexElementoSeleccionado = -1;

    public modal: NgbModalRef;

    @Input() direcciones: DireccionEstudianteDto[] = [];

    constructor(
        injector: Injector,
        private _tipoDireccionService: TipoDireccionServiceProxy,
        private _sectorService: SectorServiceProxy,
        private modalHelper: ModalHelper
    ) {
        super(injector)
    }

    ngOnInit(): void {
        this.obtenerTiposDireccion();
        this.obtenerSectores();
    }


    obtenerTiposDireccion() {
        this._tipoDireccionService.getAllForSelect()
            .subscribe((result: TipoDireccionDto[]) => {
                this.tiposDireccion = result;
            });
    }

    obtenerSectores() {
        this._sectorService.getAllForSelect()
            .subscribe((result: SectorDto[]) => {
                this.sectores = result;
            });
    }

    agregarDireccion(content) {
        this.indexElementoSeleccionado = -1;
        this.direccion = new DireccionEstudianteDto();
        this.modal = this.modalHelper.getMediumModal(content);
    }

    editarDireccion(direccion: DireccionEstudianteDto, content) {
        this.indexElementoSeleccionado = this.direcciones.indexOf(direccion);
        this.direccion = JSON.parse(JSON.stringify(direccion));
        this.modal = this.modalHelper.getMediumModal(content);
    }

    registrarDireccions() {
        if (!this.direccionExisteDetalle()) {

            this.direccion.tipoDireccionNombre = this.direccionSelect.descripcion;
            this.direccion.sectorNombre = this.sectorSelect.nombre;

            if (this.indexElementoSeleccionado >= 0) {
                this.direcciones[this.indexElementoSeleccionado] = this.direccion;
            } else {
                this.direcciones.push(this.direccion);
            }

            this.listaVisualizacionDireccion = [...this.direcciones];
            this.indexElementoSeleccionado = -1;
            this.direccion = null;
            this.modal.close();
        }
    }

    direccionExisteDetalle(): boolean {
        for (const item of this.direcciones) {
            if (this.direcciones.indexOf(item) !== this.indexElementoSeleccionado &&
                item.descripcion === this.direccion.descripcion) {
                MessageHelper.show('La dirección ya existe en el detalle', 'Ya existe');
                return true;
            }
        }
        return false;
    }

    onSectorChange(event: any) {
        this.sectorSelect = event;
    }

    onTipoDireccionChange(event: any) {
        this.direccionSelect = event;
    }

    eliminarElementoLista(lista: any[], row) {
        console.log(lista);
        MessageHelper.confirm(
            'Se eliminará el elemento seleccionado',
            '¿Desea borrarlo?',
            () => {
                lista.splice(lista.indexOf(row), 1);
            }
        );
    }
}
