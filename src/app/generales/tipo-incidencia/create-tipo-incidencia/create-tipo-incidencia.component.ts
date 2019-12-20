import { Component, ViewChild, Injector, ElementRef, OnInit } from '@angular/core';
import { TipoIncidenciaDto, TipoIncidenciaServiceProxy, EstadoIncidenciaDto} from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MessageHelper } from '@app/shared/MessageHelper';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalHelper } from '@shared/helpers/ModalHelper';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';

@Component({
  selector: 'app-create-tipo-incidencia',
  templateUrl: './create-tipo-incidencia.component.html'
})
export class CreateTipoIncidenciaComponent extends AppComponentBase implements OnInit {


    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    editando = true;

    indexElementoSeleccionado = -1;
    tipoIncidencia: TipoIncidenciaDto = new TipoIncidenciaDto();
    estadoIncidencia = new EstadoIncidenciaDto();
    ngxDatatableHelper = NgxDatatableHelper;

    public modal: NgbModalRef;

    constructor(
        injector: Injector,
        private _router: Router,
        private _route: ActivatedRoute,
        private modalHelper: ModalHelper,
        private _tipoIncidenciaService: TipoIncidenciaServiceProxy,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.obtenerValoresDefecto();

        const id = this._route.snapshot.params['id'];

        if (id > 0) {
            this.editando = true;
            this._tipoIncidenciaService.getIncluding(id)
            .subscribe(
                (result) => {
                    this.tipoIncidencia = result;
                    this.active = true;
                }
            );
        }
    }

    save(form: NgForm): void {

        if (form.valid) {

            this.saving = true;
            this._tipoIncidenciaService.create(this.tipoIncidencia)
                .pipe(finalize(() => { this.saving = false; }))
                .subscribe(() => {
                    this.notify.info(this.l('Registrado exitosamente'), this.l('Completado'));
                    this.close();
                });
        } else {
            this.notify.warn(this.l('Complete los valores requeridos'), this.l('Corregir'), { preventDuplicates: true } );
        }
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/generales/tipo-incidencia'])
    }

    agregarEstadoIncidencia(content: any) {
        this.indexElementoSeleccionado = -1;
        this.estadoIncidencia = new EstadoIncidenciaDto();
        this.modal = this.modalHelper.getMediumModal(content);
    }

    registrarEstadoIncidencia() {

        const estadoIncidenciaAgregar = new EstadoIncidenciaDto({
            descripcion: this.estadoIncidencia.descripcion,
            id: 0
        })


        if (!this.estadoIncidenciaExisteDetalle()) {
            if (this.indexElementoSeleccionado >= 0) {
                this.tipoIncidencia.listaEstadoIncidencia[this.indexElementoSeleccionado] = estadoIncidenciaAgregar;
            } else {
                this.tipoIncidencia.listaEstadoIncidencia.push(estadoIncidenciaAgregar);
            }
            this.tipoIncidencia.listaEstadoIncidencia = [...this.tipoIncidencia.listaEstadoIncidencia]
            this.modal.close();
        }
    }

    estadoIncidenciaExisteDetalle(): boolean {

        for (const item of this.tipoIncidencia.listaEstadoIncidencia) {
            if (this.tipoIncidencia.listaEstadoIncidencia.indexOf(item) !== this.indexElementoSeleccionado &&
                item.descripcion === this.estadoIncidencia.descripcion
                ) {
                MessageHelper.show('El estado ya existe en el detalle', 'Ya existe');
                return true;
            }
        }
        return false;
    }

    eliminarElementoLista(lista: any[], row: any) {
        console.log(lista);
        MessageHelper.confirm(
            'Se eliminará el elemento seleccionado',
            '¿Desea borrarlo?',
            () => {
                lista.splice(lista.indexOf(row), 1);
            }
        );
    }

    obtenerValoresDefecto() {
        this.tipoIncidencia.init({ listaEstadoIncidencia: [] })
    }
}
