import { Component, ViewChild, Injector, ElementRef, OnInit } from '@angular/core';
import { InscripcionDto, InscripcionServiceProxy, MateriaDto, MateriaServiceProxy,
         GrupoDto, GrupoServiceProxy, EstudianteDto, EstudianteServiceProxy,
         PeriodoDto, PeriodoServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html'
})
export class InscripcionComponent extends AppComponentBase implements OnInit {


    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    inscripcion: InscripcionDto = new InscripcionDto();
    materia: MateriaDto = new MateriaDto();
    materias: MateriaDto[] = [];
    grupos: GrupoDto[] = [];
    estudiantes: EstudianteDto[] = [];
    estudiante: EstudianteDto = new EstudianteDto;
    periodos: PeriodoDto[] = [];
    materiaSeleccionada = 0;
    today: number = Date.now();

    constructor(
        injector: Injector,
        private _router: Router,
        private _inscripcionService: InscripcionServiceProxy,
        private _materiaService: MateriaServiceProxy,
        private _grupoService: GrupoServiceProxy,
        private _estudianteService: EstudianteServiceProxy,
        private _periodoService: PeriodoServiceProxy,
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getMaterias();
        this.getEstudiantes();
        this.getPeriodos();
    }

    save(form: NgForm): void {

        if (form.valid) {

            this.saving = true;
            this._inscripcionService.create(this.inscripcion)
                .pipe(finalize(() => { this.saving = false; }))
                .subscribe(() => {
                    this.notify.info(this.l('Registrado exitosamente'), this.l('Completado'));
                    this.inscripcion = new InscripcionDto();
                    this.grupos = [];
                    this.materia = new MateriaDto();
                    this.estudiante = new EstudianteDto;
                    this.materiaSeleccionada = 0;
    this.close();
                });
        } else {
            this.notify.warn(this.l('Complete los valores requeridos'), this.l('Corregir'), { preventDuplicates: true } );
        }
    }
    getMaterias() {
        this._materiaService.getAllForSelect()
        .subscribe((result: MateriaDto[]) => {
            this.materias = result;
        });
    }

    getEstudiantes() {
        this._estudianteService.getAllForSelect()
        .subscribe((result: EstudianteDto[]) => {
            this.estudiantes = result;
        });
    }

    getPeriodos() {
        this._periodoService.getAllForSelect()
        .subscribe((result: PeriodoDto[]) => {
            this.periodos = result;
        });
    }

    onMateriaChanged(event: any) {
        this._materiaService.get(event.id)
        .subscribe((result: MateriaDto) => {
            this.materia = result;
        });

        this._grupoService.getAllForSelectByMateria(event.id)
        .subscribe((result: GrupoDto[]) => {
            this.grupos = result;
        });
    }

    onEstudianteChanged(event: any) {
        this._estudianteService.getIncluding(event.id)
        .subscribe((result: EstudianteDto) => {
            this.estudiante = result;
        });
    }

    procesarInscripcion() {

    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/inscripcion/inscripcion'])
    }

}
