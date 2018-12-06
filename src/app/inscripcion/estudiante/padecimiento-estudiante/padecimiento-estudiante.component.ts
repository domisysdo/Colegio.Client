import { OnInit, Component, Input, Injector, AfterContentChecked } from '@angular/core';
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

export class PadecimientoEstudianteComponent extends AppComponentBase implements OnInit, AfterContentChecked {
    padecimiento: PadecimientoDto;
    padecimientoSelect: any;
    tiposPadecimiento: TipoPadecimientoDto[];
    listaVisualizacionPadecimientos: PadecimientoDto[] = [];
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

    ngAfterContentChecked(): void {
        this.listaVisualizacionPadecimientos = [...this.padecimientos];
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
            if (this.padecimientoSelect) {
                this.padecimiento.tipoPadecimientoDescripcion = this.padecimientoSelect.descripcion;
            }

            const padecimientoAgregar = new PadecimientoDto({
                estudianteId: this.padecimiento.estudianteId,
                descripcion: this.padecimiento.descripcion,
                nota: this.padecimiento.nota,
                tipoPadecimientoDescripcion: this.padecimiento.tipoPadecimientoDescripcion,
                tipoPadecimientoId: this.padecimiento.tipoPadecimientoId,
                id: 0
            })

            if (this.indexElementoSeleccionado >= 0) {
                this.padecimientos[this.indexElementoSeleccionado] = padecimientoAgregar;
            } else {
                this.padecimientos.push(padecimientoAgregar);
            }

            this.listaVisualizacionPadecimientos = [...this.padecimientos];
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
                this.listaVisualizacionPadecimientos.splice(this.listaVisualizacionPadecimientos.indexOf(row), 1);
            }
        );
    }
}
