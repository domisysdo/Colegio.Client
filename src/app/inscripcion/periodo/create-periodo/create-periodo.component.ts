import { Component, ViewChild, Injector, ElementRef, OnInit } from '@angular/core';
import { PeriodoDto, PeriodoServiceProxy, MateriaDto, MateriaServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-periodo',
  templateUrl: './create-periodo.component.html'
})
export class CreatePeriodoComponent extends AppComponentBase implements OnInit {


    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    periodo: PeriodoDto = new PeriodoDto();
    materias: MateriaDto[] = [];
    paisId = 0;
    constructor(
        injector: Injector,
        private _router: Router,
        private _periodoService: PeriodoServiceProxy,
        private _materiaService: MateriaServiceProxy
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this.getMaterias();
    }

    save(form: NgForm): void {

        if (form.valid) {

            this.saving = true;
            this._periodoService.create(this.periodo)
                .pipe(finalize(() => { this.saving = false; }))
                .subscribe(() => {
                    this.notify.info(this.l('Registrado exitosamente'), this.l('Completado'));
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

    close(): void {
        this.active = false;
        this._router.navigate(['app/inscripcion/periodo'])
    }

}
