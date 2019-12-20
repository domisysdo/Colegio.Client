import { Component, ViewChild, Injector, ElementRef, OnInit } from '@angular/core';
import { CalificacionDto, CalificacionServiceProxy, GrupoServiceProxy,
         MateriaServiceProxy, MetodoEvaluacionServiceProxy, GrupoDto,
         MateriaDto, DetalleMetodoEvaluacion, DetalleMetodoEvaluacionDto, EstudianteDto } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MessageHelper } from '@app/shared/MessageHelper';
import { ModalHelper } from '@shared/helpers/ModalHelper';
import { NgxDatatableHelper } from '@shared/helpers/NgxDatatableHelper';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-create-calificacion',
    templateUrl: './create-calificacion.component.html'
})
export class CreateCalificacionComponent extends AppComponentBase implements OnInit {


    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    editando = false;


    ngxDatatableHelper = NgxDatatableHelper;
    indexElementoSeleccionado = -1;
    calificacion: CalificacionDto = new CalificacionDto();
    metodosEvaluacionSelect: DetalleMetodoEvaluacionDto = new DetalleMetodoEvaluacionDto();
    grupos: GrupoDto[] = [];
    materias: MateriaDto[] = [];
    metodosEvaluacion: DetalleMetodoEvaluacionDto[] = []
    estudiante: EstudianteDto[] = [];

    public modal: NgbModalRef;

    constructor(
        injector: Injector,
        private _router: Router,
        private modalHelper: ModalHelper,
        private _route: ActivatedRoute,
        private _calificacionService: CalificacionServiceProxy,
        private _grupoService: GrupoServiceProxy,
        private _materiaService: MateriaServiceProxy,
        private _metodoEvaluacionService: MetodoEvaluacionServiceProxy

    ) {
        super(injector);
    }

    ngOnInit(): void {

        this.obtenerValoresDefecto();
        this.obtenerMaterias();
        this.obtenerGrupos();

        const id = this._route.snapshot.params['id'];

        if (id > 0) {
            this.editando = true;
            this._calificacionService.get(id)
                .subscribe(
                    (result) => {
                        this.calificacion = result;
                        this.active = true;
                    }
                );
        }
    }

    save(form: NgForm): void {

        if (form.valid) {


            if (!this.validar()) {
                return;
            }

            this.saving = true;
            this.calificacion.estudianteId = this.estudiante[0].id;
            this._calificacionService.create(this.calificacion)
                .pipe(finalize(() => { this.saving = false; }))
                .subscribe(() => {
                    this.notify.info(this.l('Registrado exitosamente'), this.l('Completado'));
                    this.close();
                });
        } else {
            this.notify.warn(this.l('Complete los valores requeridos'), this.l('Corregir'), { preventDuplicates: true });
        }
    }


    obtenerValoresDefecto() {

    }

    obtenerGrupos() {
        this._grupoService.getAllForSelect()
        .subscribe((result: GrupoDto[]) => {
            this.grupos = result;
        });
    }

    obtenerMaterias() {
        this._materiaService.getAllForSelect()
        .subscribe((result: MateriaDto[]) => {
            this.materias = result;
        });
    }

    obtenerMetodosEvaluacion(metodoEvaluacionId: number) {
        this._metodoEvaluacionService.getDetalleMetodosEvaluacion(metodoEvaluacionId)
        .subscribe((result: DetalleMetodoEvaluacion[]) => {
            this.metodosEvaluacion = result;
        });
    }

    onMateriaChange(event: any) {
        this.obtenerMetodosEvaluacion(event.metodoEvaluacionId);
    }

    onDetalleMetodoEvaluacionChange(event: any) {
        this.metodosEvaluacionSelect = event;
    }

    validar(): boolean {

        if (this.estudiante[0] === undefined || this.estudiante[0].id <= 0) {
            MessageHelper.show('Debe seleccionar un estudiante', 'Seleccione');
            return false;
        }

        if (this.metodosEvaluacionSelect) {
            if (+this.calificacion.puntuacion > +this.metodosEvaluacionSelect.puntuacion) {
                MessageHelper.show('La puntuación para este método de evaluación va desde 0 hasta ' +
                                    this.metodosEvaluacionSelect.puntuacion + ', valor ingresado ' +
                                    this.calificacion.puntuacion,
                                     'Verifique');
                return false;
            }
        }
        return true;
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/notas/calificacion'])
    }
}
