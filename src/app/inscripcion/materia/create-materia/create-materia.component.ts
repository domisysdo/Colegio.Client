import { Component, ViewChild, Injector, ElementRef, OnInit } from '@angular/core';
import { MateriaDto, MateriaServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-materia',
  templateUrl: './create-materia.component.html'
})
export class CreateMateriaComponent extends AppComponentBase implements OnInit {


    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    materia: MateriaDto = new MateriaDto();
    materias: MateriaDto[] = [];
    paisId = 0;
    constructor(
        injector: Injector,
        private _router: Router,
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
            this._materiaService.create(this.materia)
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
        this._router.navigate(['app/inscripcion/materia'])
    }

}
