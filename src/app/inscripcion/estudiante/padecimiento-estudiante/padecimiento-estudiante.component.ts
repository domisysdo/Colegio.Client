import { OnInit, Component, Input, Injector } from '@angular/core';
import { PadecimientoDto, TipoPadecimientoServiceProxy, TipoPadecimientoDto } from '@shared/service-proxies/service-proxies';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalHelper } from '@shared/helpers/ModalHelper';
import { MessageHelper } from '@app/shared/MessageHelper';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';
import { AppComponentBase } from '@shared/app-component-base';
import { EMAIL_PATTERN } from '@shared/helpers/constantes-globales';

@Component({
    selector: 'app-padecimiento-estudiante',
    templateUrl: './padecimiento-estudiante.component.html'
})

export class PadecimientoEstudianteComponent extends AppComponentBase implements OnInit {
    padecimiento: PadecimientoDto;
    padecimientoSelect: any;
    tiposPadecimiento: TipoPadecimientoDto[];
    listaVisualizacionpadecimientos: PadecimientoDto[] = [];
    modal: NgbModalRef;

    ngxDatatableHelper = NgxDatatableHelper;
    padecimientoPattern = EMAIL_PATTERN;
    indexElementoSeleccionado = -1;

    @Input() padecimientos: PadecimientoDto[];

    constructor(
        injector: Injector,
        private _tipoPadecimientoService: TipoPadecimientoServiceProxy,
        private modalHelper: ModalHelper
    ) {
        super(injector)
    }

    ngOnInit(): void {
        this.obtenerTiposPadecimiento();
    }


    obtenerTiposPadecimiento() {
        this._tipoPadecimientoService.getAllForSelect()
            .subscribe((result: TipoPadecimientoDto[]) => {
                this.tiposPadecimiento = result;
            });
    }

    agregarPadecimiento(content) {
        this.indexElementoSeleccionado = -1;
        this.padecimiento = new PadecimientoDto();
        this.modal = this.modalHelper.getMediumModal(content);
    }

    editarPadecimiento(padecimiento: PadecimientoDto, content) {
        this.indexElementoSeleccionado = this.padecimientos.indexOf(padecimiento);
        this.padecimiento = JSON.parse(JSON.stringify(padecimiento));
        this.modal = this.modalHelper.getMediumModal(content);
    }

    registrarPadecimientos() {
        if (!this.padecimientoExisteDetalle()) {
            this.padecimiento.tipoPadecimientoDescripcion = this.padecimientoSelect.descripcion;

            if (this.indexElementoSeleccionado >= 0) {
                this.padecimientos[this.indexElementoSeleccionado] = this.padecimiento;
            } else {
                this.padecimientos.push(this.padecimiento);
            }

            this.listaVisualizacionpadecimientos = [...this.padecimientos];
            this.modal.close();
        }
    }

    padecimientoExisteDetalle(): boolean {
        for (const item of this.padecimientos) {
            if (this.padecimientos.indexOf(item) !== this.indexElementoSeleccionado &&
                item.descripcion === this.padecimiento.descripcion) {
                MessageHelper.show('El padecimiento ya existe en el detalle', 'Ya existe');
                return true;
            }
        }
        return false;
    }

    onTipoPadecimientoChange(event: any) {
        this.padecimientoSelect = event;
    }

    eliminarElementoLista(lista: any[], row) {
        console.log(lista);
        MessageHelper.confirm(
            'Se eliminará el elemento seleccionado',
            '¿Desea borrarlo?',
            () => {
                lista.splice(lista.indexOf(row), 1);
                this.listaVisualizacionpadecimientos.splice(this.listaVisualizacionpadecimientos.indexOf(row), 1);
            }
        );
    }
}
