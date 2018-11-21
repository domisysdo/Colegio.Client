import { Component, ViewChild, Injector, ElementRef } from '@angular/core';
import { PaisDto, PaisServiceProxy } from '@shared/service-proxies/service-proxies';
import { AppComponentBase } from '@shared/app-component-base';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-pais',
  templateUrl: './create-pais.component.html'
})
export class CreatePaisComponent extends AppComponentBase {

    @ViewChild('content') content: ElementRef;

    active = false;
    saving = false;
    pais: PaisDto = new PaisDto();

    constructor(
        injector: Injector,
        private _router: Router,
        private _paisService: PaisServiceProxy,
    ) {
        super(injector);
    }

    save(form: NgForm): void {

        if (form.valid) {

            this.saving = true;
            this._paisService.create(this.pais)
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
        this._router.navigate(['app/generales/pais'])
    }
}
