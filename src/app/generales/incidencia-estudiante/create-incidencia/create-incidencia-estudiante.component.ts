import { Component, ViewChild, Injector, ElementRef, OnInit } from '@angular/core';
import { IncidenciaEstudianteDto, IncidenciaEstudianteServiceProxy,
         EstudianteDto, MateriaDto, TipoIncidenciaDto,
         TipoIncidenciaServiceProxy, MateriaServiceProxy, EstadoIncidenciaDto } from '@shared/service-proxies/service-proxies';

import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MessageHelper } from '@app/shared/MessageHelper';

@Component({
  selector: 'app-create-incidencia-estudiante',
  templateUrl: './create-incidencia-estudiante.component.html'
})
export class CreateIncidenciaEstudianteComponent extends AppComponentBase implements OnInit {


    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    estudiante: EstudianteDto[] = [];
    materias: MateriaDto[] = [];
    estadosIncidencia: EstadoIncidenciaDto[] = [];
    tiposIncidencia: TipoIncidenciaDto[] = [];
    incidenciaEstudiante: IncidenciaEstudianteDto = new IncidenciaEstudianteDto();

    constructor(
        injector: Injector,
        private _router: Router,
        private _incidenciaEstudianteService: IncidenciaEstudianteServiceProxy,
        private _tipoIncidenciaService: TipoIncidenciaServiceProxy,
        private _materiaService: MateriaServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getMaterias();
        this.getTiposIncidencia();
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

    save(form: NgForm): void {

        if (form.valid) {

            this.saving = true;
            if (this.estudiante[0].id <= 0) {
                MessageHelper.show('Debe seleccionar un estudiante', 'Seleccione');
                return;
            }

            this.incidenciaEstudiante.estudianteId = this.estudiante[0].id;
            this._incidenciaEstudianteService.create(this.incidenciaEstudiante)
                .pipe(finalize(() => { this.saving = false; }))
                .subscribe(() => {
                    this.notify.info(this.l('Registrado exitosamente'), this.l('Completado'));
                    this.close();
                });
        } else {
            this.notify.warn(this.l('Complete los valores requeridos'), this.l('Corregir'), { preventDuplicates: true } );
        }
    }
    onTipoIncidenciaChange(event: any) {
        this.obtenerEstadosIncidencia(event.id);
    }

    onEstadoIncidenciaChange(event: any) {
        if (event) {
            this.incidenciaEstudiante.descripcion = event.descripcion;
        }
    }

    obtenerEstadosIncidencia(tipoIncidenciaId: number) {
        this._tipoIncidenciaService.getEstadosIncidencia(tipoIncidenciaId)
        .subscribe((result: EstadoIncidenciaDto[]) => {
            this.estadosIncidencia = result;
        });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/generales/incidencia-estudiante'])
    }
}
