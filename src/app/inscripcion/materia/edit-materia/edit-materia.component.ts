import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { MateriaDto, MateriaServiceProxy, MetodoEvaluacionDto, MetodoEvaluacionServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-materia',
    templateUrl: './edit-materia.component.html'
})
export class EditMateriaComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    materia: MateriaDto = new MateriaDto();
    materias: MateriaDto[] = [];
    metodosEvaluacion: MetodoEvaluacionDto[] = []


    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _materiaService: MateriaServiceProxy,
        private _metodoEvaluacionService: MetodoEvaluacionServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        const id = this._route.snapshot.params['id'];
        this.getMaterias();
        this.obtenerMetodosEvaluacion();

        this._materiaService.get(id)
            .subscribe(
            (result) => {
                this.materia = result;
                this.active = true;
            }
        );

    }

    save(): void {

        this.saving = true;
        this._materiaService.update(this.materia)
            .pipe(finalize(() => { this.saving = false; }))
            .subscribe(() => {
                this.notify.info(this.l('Modificado exitosamente'), this.l('Completado'));
                this.close();
            });
    }

    getMaterias() {
        this._materiaService.getAllForSelect()
        .subscribe((result: MateriaDto[]) => {
            this.materias = result;
        });
    }
    
    obtenerMetodosEvaluacion() {
        this._metodoEvaluacionService.getAllForSelect()
        .subscribe((result: MetodoEvaluacionDto[]) => {
            this.metodosEvaluacion = result;
        });
    }

    close(): void {
        this.active = false;
        this._router.navigate(['app/inscripcion/materia'])
    }
}
