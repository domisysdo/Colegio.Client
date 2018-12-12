import { Component, ViewChild, Injector, ElementRef } from '@angular/core';
import { MetodoEvaluacionDto, MetodoEvaluacionServiceProxy, DetalleMetodoEvaluacionDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MessageHelper } from '@app/shared/MessageHelper';
import { ModalHelper } from '@shared/helpers/ModalHelper';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-metodo-evaluacion',
  templateUrl: './create-metodo-evaluacion.component.html'
})
export class CreateMetodoEvaluacionComponent extends AppComponentBase {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    ngxDatatableHelper = NgxDatatableHelper;
    indexElementoSeleccionado = -1;
    metodoEvaluacion: MetodoEvaluacionDto = new MetodoEvaluacionDto();
    detalleMetodoEvaluacion: DetalleMetodoEvaluacionDto = new DetalleMetodoEvaluacionDto();

    public modal: NgbModalRef;

    constructor(
        injector: Injector,
        private _router: Router,
        private modalHelper: ModalHelper,
        private _metodoEvaluacionService: MetodoEvaluacionServiceProxy,
    ) {
        super(injector);
    }

    save(form: NgForm): void {

        if (form.valid) {

            this.saving = true;
            this._metodoEvaluacionService.create(this.metodoEvaluacion)
                .pipe(finalize(() => { this.saving = false; }))
                .subscribe(() => {
                    this.notify.info(this.l('Registrado exitosamente'), this.l('Completado'));
                    this.close();
                });
        } else {
            this.notify.warn(this.l('Complete los valores requeridos'), this.l('Corregir'), { preventDuplicates: true } );
        }
    }

    agregarMetodoEvaluacion(content) {
        this.indexElementoSeleccionado = -1;
        this.detalleMetodoEvaluacion = new DetalleMetodoEvaluacionDto();
        this.modal = this.modalHelper.getMediumModal(content);
    }

    editarMetodoEvaluacion(detalleMetodoEvaluacion: DetalleMetodoEvaluacionDto, content) {
        this.indexElementoSeleccionado = this.metodoEvaluacion.listaMetodoEvaluacion.indexOf(detalleMetodoEvaluacion);
        this.detalleMetodoEvaluacion = JSON.parse(JSON.stringify(detalleMetodoEvaluacion));
        this.modal = this.modalHelper.getMediumModal(content);
    }

    registrarMetodoEvaluacion() {

        const metodoEvaluacionAgregar = new DetalleMetodoEvaluacionDto({
            descripcion: this.detalleMetodoEvaluacion.descripcion,
            puntuacion: this.detalleMetodoEvaluacion.puntuacion,
            metodoEvaluacionId: 0,
            id: 0
        })

        if (!this.metodoEvaluacionExisteDetalle()) {
            if (this.indexElementoSeleccionado >= 0) {
                this.metodoEvaluacion.listaMetodoEvaluacion[this.indexElementoSeleccionado] = metodoEvaluacionAgregar;
            } else {
                this.metodoEvaluacion.listaMetodoEvaluacion.push(metodoEvaluacionAgregar);
            }
            this.metodoEvaluacion.listaMetodoEvaluacion = [...this.metodoEvaluacion.listaMetodoEvaluacion]
            this.modal.close();
        }
    }

    metodoEvaluacionExisteDetalle(): boolean {
        for (const item of this.metodoEvaluacion.listaMetodoEvaluacion) {
            if (this.metodoEvaluacion.listaMetodoEvaluacion.indexOf(item) !== this.indexElementoSeleccionado &&
                item.descripcion === this.metodoEvaluacion.descripcion) {
                MessageHelper.show('El método de evaluación ya existe en el detalle', 'Ya existe');
                return true;
            }
        }
        return false;
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

    close(): void {
        this.active = false;
        this._router.navigate(['app/notas/metodo-evaluacion'])
    }
}
