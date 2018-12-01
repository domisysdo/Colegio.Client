import { Component, ViewChild, Injector, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { PeriodoDto, PeriodoServiceProxy, MateriaDto, MateriaServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-periodo',
    templateUrl: './edit-periodo.component.html'
})
export class EditPeriodoComponent extends AppComponentBase implements OnInit {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    periodo: PeriodoDto = new PeriodoDto();
    materias: MateriaDto[] = [];


    constructor(
        injector: Injector,
        private _route: ActivatedRoute,
        private _router: Router,
        private _periodoService: PeriodoServiceProxy,
        private _materiaService: MateriaServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        const id = this._route.snapshot.params['id'];
        this.getMaterias();

        this._periodoService.get(id)
            .subscribe(
            (result) => {
                this.periodo = result;
                this.active = true;
            }
        );

    }

    save(): void {

        this.saving = true;
        this._periodoService.update(this.periodo)
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

    close(): void {
        this.active = false;
        this._router.navigate(['app/inscripcion/periodo'])
    }
}
