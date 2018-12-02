import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { IncidenciaEstudianteDto, IncidenciaEstudianteServiceProxy,
         EstudianteDto, MateriaDto, TipoIncidenciaDto, TipoIncidenciaServiceProxy,
         MateriaServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageHelper } from '@app/shared/MessageHelper';

@Component({
    selector: 'app-edit-incidencia-estudiante',
    templateUrl: './edit-incidencia-estudiante.component.html'
})
export class EditIncidenciaEstudianteComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    estudiante: EstudianteDto[] = [];
    materias: MateriaDto[] = [];
    tiposIncidencia: TipoIncidenciaDto[] = [];
    incidenciaEstudiante: IncidenciaEstudianteDto = new IncidenciaEstudianteDto();


    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _incidenciaEstudianteService: IncidenciaEstudianteServiceProxy,
        private _tipoIncidenciaService: TipoIncidenciaServiceProxy,
        private _materiaService: MateriaServiceProxy

    ) {
        super(injector);
    }

    getTiposIncidencia() {
        this._tipoIncidenciaService.getAllForSelect()
        .subscribe((result: TipoIncidenciaDto[]) => {
            this.tiposIncidencia = result;
        });
    }

    getMaterias() {
        this._materiaService.getAllForSelect()
        .subscribe((result: MateriaDto[]) => {
            this.materias = result;
        });
    }

    ngOnInit(): void {
        const id = this._route.snapshot.params['id'];

        this._incidenciaEstudianteService.get(id)
            .subscribe(
            (result) => {
                this.incidenciaEstudiante = result;
                this.active = true;
            }
        );
    }

    save(): void {

        this.saving = true;
        if (this.estudiante[0].id <= 0) {
            MessageHelper.show('Debe seleccionar un estudiante', 'Seleccione');
            return;
        }
        this.incidenciaEstudiante.estudianteId = this.estudiante[0].id;

        this._incidenciaEstudianteService.update(this.incidenciaEstudiante)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('Modificado exitosamente'), this.l('Completado'));
                this.close();
            });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/inscripcion/incidencia-estudiante'])
    }
}
