import { Component, ViewChild, Injector, ElementRef } from '@angular/core';
import { ParentescoDto, ParentescoServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-parentesco',
  templateUrl: './create-parentesco.component.html'
})
export class CreateParentescoComponent extends AppComponentBase {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    parentesco: ParentescoDto = new ParentescoDto();

    constructor(
        injector: Injector,
        private _router: Router,
        private _parentescoService: ParentescoServiceProxy,
    ) {
        super(injector);
    }

    save(form: NgForm): void {

        if (form.valid) {

            this.saving = true;
            this._parentescoService.create(this.parentesco)
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
        this._router.navigate(['app/inscripcion/parentesco'])
    }
}
